import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteLayout from './SiteLayout.jsx'

export default function LanguageLayout() {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const supported = lang === 'en' || lang === 'es'

  useEffect(() => {
    if (!supported) return
    i18n.changeLanguage(lang)
    document.documentElement.lang = lang
    try {
      localStorage.setItem('ricardo-portfolio-language', lang)
    } catch {
      // URL-based localization still works when storage is unavailable.
    }
  }, [lang, supported, i18n])

  if (!supported) return <Navigate to="/en" replace />
  // Do not briefly render the previous language on direct entry or navigation.
  if (i18n.resolvedLanguage !== lang) return null
  return <SiteLayout />
}
