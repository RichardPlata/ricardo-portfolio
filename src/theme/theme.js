export const themeStorageKey = 'ricardo-portfolio-theme'

export function getInitialTheme() {
  if (import.meta.env.DEV && typeof document !== 'undefined') {
    const previewTheme = document.documentElement.dataset.previewTheme
    if (previewTheme === 'light' || previewTheme === 'dark') return previewTheme
  }
  try {
    return localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
}

export function saveTheme(theme) {
  // Review frames must not overwrite the visitor's saved theme.
  if (import.meta.env.DEV && document.documentElement.dataset.previewTheme) return
  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // Theme remains usable with blocked browser storage.
  }
}
