import { useEffect, useState, useSyncExternalStore } from 'react'
import { siteConfig } from '../config/siteConfig.js'
import './preview.css'

const viewports = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 390, height: 844 },
]
const messages = {
  en: {
    title: 'Responsive preview', note: 'Development only · Actual viewport sizes, visually scaled.',
    language: 'Language', theme: 'Theme', light: 'Light', dark: 'Dark',
    scale: 'Scale', fit: 'Fit', reload: 'Reload frames',
    help: 'Each frame scrolls independently. Theme changes here do not overwrite your saved portfolio preference.',
    open: 'Open page', blocked: 'Nested previews are disabled.',
  },
  es: {
    title: 'Vista previa adaptable', note: 'Solo desarrollo · Tamaños reales de viewport, escalados visualmente.',
    language: 'Idioma', theme: 'Tema', light: 'Claro', dark: 'Oscuro',
    scale: 'Escala', fit: 'Ajustar', reload: 'Recargar vistas',
    help: 'Cada vista tiene su propio desplazamiento. El tema elegido aquí no modifica tu preferencia guardada del portafolio.',
    open: 'Abrir página', blocked: 'Las vistas previas anidadas están desactivadas.',
  },
}

function subscribeToViewport(callback) {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

export default function ResponsivePreview() {
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('light')
  const [zoom, setZoom] = useState('fit')
  const [revision, setRevision] = useState(0)
  const width = useSyncExternalStore(subscribeToViewport, () => window.innerWidth, () => 1440)
  const copy = messages[language]
  const scale = zoom === 'fit' ? Math.min(0.6, Math.max(0.32, (width - 128) / 2598)) : Number(zoom)

  useEffect(() => {
    document.title = `${copy.title} | ${siteConfig.name}`
    document.documentElement.lang = language
  }, [language, copy.title])

  // Hardcoded localized Home destinations below can never point back to this route.
  if (typeof window !== 'undefined' && window.self !== window.top) {
    return <p className="preview-blocked">{copy.blocked}</p>
  }

  return (
    <main className="preview-workspace">
      <header className="preview-toolbar">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.note}</p>
        </div>
        <div className="preview-controls">
          <label>{copy.language}
            <select value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option value="en">English</option><option value="es">Español</option>
            </select>
          </label>
          <label>{copy.theme}
            <select value={theme} onChange={(event) => setTheme(event.target.value)}>
              <option value="light">{copy.light}</option><option value="dark">{copy.dark}</option>
            </select>
          </label>
          <label>{copy.scale}
            <select value={zoom} onChange={(event) => setZoom(event.target.value)}>
              <option value="fit">{copy.fit}</option>
              <option value="0.5">50%</option><option value="0.75">75%</option><option value="1">100%</option>
            </select>
          </label>
          <button type="button" onClick={() => setRevision((value) => value + 1)}>{copy.reload}</button>
          <a href={`/${language}`}>{copy.open} ↗</a>
        </div>
      </header>
      <p className="preview-help">{copy.help}</p>
      <div className="preview-canvas" tabIndex={0} role="region" aria-label={copy.title}>
        {viewports.map((viewport) => (
          <figure className="preview-viewport" key={viewport.name} style={{ width: viewport.width * scale }}>
            <figcaption>
              <strong>{viewport.name}</strong>
              <span>{viewport.width} × {viewport.height} · {Math.round(scale * 100)}%</span>
            </figcaption>
            <div className="preview-frame" style={{ width: viewport.width * scale, height: viewport.height * scale }}>
              <iframe
                key={`${language}-${theme}-${revision}`}
                title={`${viewport.name} — ${viewport.width} × ${viewport.height} — ${language}`}
                src={`/${language}?__preview=1&__previewTheme=${theme}`}
                width={viewport.width} height={viewport.height}
                style={{ transform: `scale(${scale})` }}
              />
            </div>
          </figure>
        ))}
      </div>
    </main>
  )
}
