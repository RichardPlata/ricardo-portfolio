import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, createRoutesFromElements, matchRoutes } from 'react-router-dom'
import { createServer } from 'vite'

const server = await createServer({ server: { host: '127.0.0.1', port: 0, open: false } })
const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')

try {
  await server.listen()
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { default: i18n } = await server.ssrLoadModule('/src/i18n/index.js')
  const { getInitialTheme, applyTheme, saveTheme, themeStorageKey } = await server.ssrLoadModule('/src/theme/theme.js')
  const { siteConfig } = await server.ssrLoadModule('/src/config/siteConfig.js')
  const saved = new Map()
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { documentElement: { dataset: {} } } })
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (key) => saved.get(key) ?? null,
    setItem: (key, value) => saved.set(key, value),
  } })

  for (const value of [undefined, 'system', 'invalid', 'light']) {
    saved.set(themeStorageKey, value)
    assert.equal(getInitialTheme(), 'light')
  }
  for (const theme of ['light', 'dark']) {
    saveTheme(theme)
    assert.equal(saved.get(themeStorageKey), theme)
    assert.equal(getInitialTheme(), theme)
    applyTheme(theme)
    assert.equal(document.documentElement.dataset.theme, theme)
    for (const lang of ['en', 'es']) {
      await i18n.changeLanguage(lang)
      const home = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [`/${lang}`] }, createElement(App)))
      assert.ok(home.includes(i18n.t('hero.headline')))
      assert.ok(home.includes(siteConfig.name))
      assert.ok(home.includes(`role="switch" aria-checked="${theme === 'dark'}"`))
      assert.ok(!home.includes('value="system"'))
      assert.ok(home.includes('aria-expanded="false"'))
      assert.ok(home.includes('aria-controls="primary-navigation"'))
      assert.ok(home.includes('aria-current="page"'))
      assert.ok(home.includes(i18n.t('hero.pending')))
    }
  }

  document.documentElement.dataset.previewTheme = 'light'
  saved.set(themeStorageKey, 'dark')
  assert.equal(getInitialTheme(), 'light')
  saveTheme('light')
  assert.equal(saved.get(themeStorageKey), 'dark')
  delete document.documentElement.dataset.previewTheme
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: () => { throw new Error('Blocked storage') },
    setItem: () => { throw new Error('Blocked storage') },
  } })
  assert.equal(getInitialTheme(), 'light')
  assert.doesNotThrow(() => saveTheme('dark'))
  console.log('PASS localized Header/Hero rendering; light default, both themes, storage failure, preview preference isolation, no System control')

  const routes = createRoutesFromElements(App().props.children)
  assert.equal(matchRoutes(routes, '/dev/preview')[0].route.path, '/dev/preview')
  const { default: ResponsivePreview } = await server.ssrLoadModule('/src/dev/ResponsivePreview.jsx')
  const preview = renderToStaticMarkup(createElement(ResponsivePreview))
  assert.equal((preview.match(/<iframe /g) || []).length, 3)
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844]]) {
    assert.ok(preview.includes(`width="${width}" height="${height}"`))
  }
  const sources = [...preview.matchAll(/<iframe[^>]+src="([^"]+)"/g)].map((match) => match[1])
  assert.equal(sources.length, 3)
  assert.ok(sources.every((source) => source === '/en?__preview=1&amp;__previewTheme=light'))
  const response = await fetch(new URL('/dev/preview', server.resolvedUrls.local[0]))
  assert.equal(response.status, 200)
  assert.ok((await response.text()).includes('/src/main.jsx'))
  console.log('PASS development preview route/markup, exact iframe dimensions, consistent English/Light defaults and non-recursive frame URLs')

  const tokens = await readFile(new URL('../src/styles/variables.css', import.meta.url), 'utf8')
  const hex = (block, name) => {
    const match = block.match(new RegExp('--color-' + name + ': (#[0-9a-f]{6})'))
    assert.ok(match, 'Missing color token: ' + name)
    return match[1]
  }
  const luminance = (color) => {
    const channels = color.slice(1).match(/../g).map((pair) => parseInt(pair, 16) / 255)
      .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  }
  const ratio = (a, b) => {
    const values = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (values[0] + 0.05) / (values[1] + 0.05)
  }
  const dark = tokens.slice(tokens.indexOf(":root[data-theme='dark']"))
  for (const [block, background] of [[tokens, hex(tokens, 'light-background')], [dark, hex(tokens, 'dark-background')]]) {
    for (const text of ['text', 'secondary', 'muted']) {
      for (const surface of [background, hex(block, 'surface'), hex(block, 'elevated')]) {
        assert.ok(ratio(hex(block, text), surface) >= 4.5, 'Insufficient text contrast: ' + text)
      }
    }
    assert.ok(ratio(hex(block, 'focus'), background) >= 3)
    assert.ok(ratio(hex(block, 'control-border'), background) >= 3)
  }
  console.log('PASS light/dark text contrast (4.5:1), focus and control border contrast (3:1)')

  const assets = await readdir(new URL('../dist/assets/', import.meta.url))
  assert.ok(assets.some((name) => name.endsWith('.woff2')), 'Missing self-hosted font')
  for (const asset of assets.filter((name) => /\.(js|css)$/.test(name))) {
    const content = await readFile(new URL('../dist/assets/' + asset, import.meta.url), 'utf8')
    for (const marker of ['/dev/preview', 'preview-workspace', '__previewTheme', 'Responsive preview']) {
      assert.ok(!content.includes(marker), 'Preview leaked into production: ' + marker)
    }
    assert.ok(!content.includes('fonts.googleapis.com'))
  }
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
  assert.ok(html.includes(siteConfig.name))
  assert.ok(!html.includes('%SITE_NAME%'))
  console.log('PASS production preview exclusion, self-hosted font output, centralized HTML title')
  console.log('LIMIT: real viewport appearance, sticky/menu interactions, frame reloads and browser theme transitions require browser QA.')
} finally {
  for (const [key, descriptor] of [['document', originalDocument], ['localStorage', originalStorage]]) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor)
    else delete globalThis[key]
  }
  await server.close()
}
