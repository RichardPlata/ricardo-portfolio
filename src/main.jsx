import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/manrope'
import './i18n/index.js'
import './index.css'
import { applyTheme, getInitialTheme } from './theme/theme.js'
import App from './App.jsx'

async function start() {
  if (import.meta.env.DEV) {
    const { initializePreviewFrame } = await import('./dev/initializePreviewFrame.js')
    initializePreviewFrame()
  }
  applyTheme(getInitialTheme())
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

start()

