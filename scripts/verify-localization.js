import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, createRoutesFromElements, matchRoutes } from 'react-router-dom'

const server = await createServer({
  server: { host: '127.0.0.1', port: 0, open: false },
})
try {
  await server.listen()



  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { default: i18n } = await server.ssrLoadModule('/src/i18n/index.js')
  const routes = createRoutesFromElements(App().props.children)
  assert.equal(matchRoutes(routes, '/')[0].route.element.props.to, '/en')

  const render = async (path, language) => {
    await i18n.changeLanguage(language)
    return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] }, createElement(App)))
  }

  for (const [language, about, detail, missing] of [
    ['en', 'About', 'case study content and media pending approval', 'Page not found'],
    ['es', 'Sobre mí', 'contenido y material visual del caso de estudio', 'Página no encontrada'],
  ]) {
    const other = language === 'en' ? 'es' : 'en'
    const home = await render(`/${language}`, language)
    assert.ok(home.includes(about))
    assert.ok(home.includes('AURA Drive'))
    assert.ok(home.includes(`href="/${language}/work/aura-drive"`))
    assert.ok(home.includes(`href="/${other}"`))

    const project = await render(`/${language}/work/aura-drive?source=test#main-content`, language)
    assert.ok(project.includes('<h1>AURA Drive</h1>'))
    assert.ok(project.includes(detail))
    assert.ok(project.includes(`href="/${other}/work/aura-drive?source=test#main-content"`))
    assert.ok(project.includes(`href="/${language}#projects"`))
    assert.ok((await render(`/${language}/work/missing`, language)).includes(missing))
    assert.ok((await render(`/${language}/missing`, language)).includes(missing))

    const collection = await render(`/${language}/work/landing-pages-collection`, language)
    for (const name of ['Landing Pages Collection', 'A+ Hardwood Flooring', 'Shine Cleaning', 'Fisiomóvil']) {
      assert.ok(collection.includes(name))
    }

    // Fresh requests verify Vite's SPA fallback for localized deep links.
    for (const path of [`/${language}`, `/${language}/work/aura-drive`]) {
      const response = await fetch(new URL(path, server.resolvedUrls.local[0]))
      assert.equal(response.status, 200)
      assert.ok((await response.text()).includes('/src/main.jsx'))
    }
    console.log(`PASS ${language}: Home, project, NotFound, collection names, switch URLs, direct HTTP requests`)
  }

  const keys = (object, prefix = '') => Object.entries(object).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'object' ? keys(value, path) : [path]
  }).sort()
  for (const namespace of ['common', 'projects']) {
    const read = async (lang) => JSON.parse((await readFile(
      new URL(`../src/locales/${lang}/${namespace}.json`, import.meta.url), 'utf8',
    )).replace(/^\uFEFF/, ''))
    assert.deepEqual(keys(await read('en')), keys(await read('es')))
  }
  assert.ok(i18n.options.fallbackLng.includes('en'))
  i18n.addResource('en', 'common', 'verificationOnly', 'English fallback')
  assert.equal(i18n.t('verificationOnly', { lng: 'es' }), 'English fallback')
  assert.equal(i18n.t('count', { ns: 'projects', lng: 'es', count: 1 }), '1 proyecto mostrado.')
  assert.equal(i18n.t('count', { ns: 'projects', lng: 'es', count: 4 }), '4 proyectos mostrados.')
  console.log('PASS translation key parity, English fallback, Spanish plurals, root redirect configuration')
  console.log('LIMIT: server rendering does not exercise browser effects, clicks, storage, or refresh.')
} finally {
  await server.close()
}

