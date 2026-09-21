import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useTheme from '../hooks/useTheme.js'

export default function Header() {
  const [theme, setTheme] = useTheme()
  const { t } = useTranslation()
  const { lang } = useParams()
  const { pathname, search, hash } = useLocation()
  const languageTarget = (language) => ({
    pathname: pathname.replace(/^\/[^/]+/, `/${language}`),
    search,
    hash,
  })

  return (
    <header className="site-header container">
      <Link to={`/${lang}`}>Ricardo Plata</Link>
      <div className="header-controls">
        <nav className="site-nav" aria-label={t('navigation.label')}>
          <Link to={`/${lang}#projects`}>{t('navigation.projects')}</Link>
          <Link to={`/${lang}#about`}>{t('navigation.about')}</Link>
          <Link to={`/${lang}#contact`}>{t('navigation.contact')}</Link>
        </nav>
        <label className="theme-control">
          {t('theme.label')}
          <select value={theme} onChange={(event) => setTheme(event.target.value)}>
            <option value="system">{t('theme.system')}</option>
            <option value="light">{t('theme.light')}</option>
            <option value="dark">{t('theme.dark')}</option>
          </select>
        </label>
        <nav className="site-nav" aria-label={t('language.label')}>
          <Link to={languageTarget('en')} lang="en" hrefLang="en"
            aria-label={t('language.english')} aria-current={lang === 'en' ? 'page' : undefined}>EN</Link>
          <span aria-hidden="true">/</span>
          <Link to={languageTarget('es')} lang="es" hrefLang="es"
            aria-label={t('language.spanish')} aria-current={lang === 'es' ? 'page' : undefined}>ES</Link>
        </nav>
      </div>
    </header>
  )
}
