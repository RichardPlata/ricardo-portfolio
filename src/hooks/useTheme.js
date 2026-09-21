import { useEffect, useState } from 'react'
import { applyTheme, getInitialTheme, saveTheme } from '../theme/theme.js'

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    saveTheme(theme)
  }, [theme])

  return [theme, setTheme]
}
