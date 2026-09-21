// Imported only in development. Never honor preview overrides in top-level pages.
export function initializePreviewFrame() {
  if (window.self === window.top) return
  const parameters = new URLSearchParams(window.location.search)
  const theme = parameters.get('__previewTheme')
  if (parameters.get('__preview') === '1' && (theme === 'light' || theme === 'dark')) {
    document.documentElement.dataset.previewTheme = theme
  }
}
