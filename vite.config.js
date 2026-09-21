import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteConfig } from './src/config/siteConfig.js'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-title',
      transformIndexHtml(html) {
        const name = siteConfig.name.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        return html.replace('%SITE_NAME%', name)
      },
    },
  ],
})
