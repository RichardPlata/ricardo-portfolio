import { useEffect, useState } from 'react'

const storageKey = 'ricardo-portfolio-theme'

function readPreference() {
  try {
    const stored = localStorage.getItem(storageKey)
    return ['light', 'dark'].includes(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

export default function useTheme() {
  const [theme, setTheme] = useState(readPreference)

  useEffect(() => {
    if (theme === 'system') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = theme
    try {
      if (theme === 'system') localStorage.removeItem(storageKey)
      else localStorage.setItem(storageKey, theme)
    } catch {
      // Theme control remains usable when browser storage is unavailable.
    }
  }, [theme])

  return [theme, setTheme]
}
