import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useTheme from '../hooks/useTheme.js'
import { siteConfig } from '../config/siteConfig.js'
import './Header.css'

export default function Header() {
  const [theme, setTheme] = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuLocation, setMenuLocation] = useState(null)
  const headerRef = useRef(null)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)
  const { t } = useTranslation()
  const { lang } = useParams()
  const { pathname, search, hash } = useLocation()
  const locationKey = pathname + search + hash
  const menuOpen = menuLocation === locationKey

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    firstLinkRef.current?.focus()
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuLocation(null)
    }
    const desktop = window.matchMedia('(min-width: 56.001rem)')
    const onResize = () => {
      if (desktop.matches) setMenuLocation(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  const languageTarget = (language) => ({
    pathname: pathname.replace(/^\/[^/]+/, `/${language}`),
    search,
    hash,
  })

  return (
    <header ref={headerRef} className="site-header" data-scrolled={scrolled}
      data-menu-open={menuOpen}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuLocation(null)
          menuButtonRef.current?.focus()
        }
      }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setMenuLocation(null)
      }}>
      <div className="header-inner container">
        <Link className="wordmark" to={`/${lang}`}>{siteConfig.name}</Link>
        <div className="header-controls">
          <nav id="primary-navigation" className="header-navigation" aria-label={t('navigation.label')}>
            <Link ref={firstLinkRef} to={`/${lang}#projects`} onClick={() => setMenuLocation(null)}>{t('navigation.projects')}</Link>
            <Link to={`/${lang}#about`} onClick={() => setMenuLocation(null)}>{t('navigation.about')}</Link>
            <Link to={`/${lang}#contact`} onClick={() => setMenuLocation(null)}>{t('navigation.contact')}</Link>
          </nav>
          <button className="theme-toggle" type="button" role="switch"
            aria-checked={theme === 'dark'} aria-label={t('theme.toggle')}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {t(`theme.${theme}`)}
          </button>
          <nav className="language-control" aria-label={t('language.label')}>
            <Link to={languageTarget('en')} lang="en" hrefLang="en"
              aria-label={t('language.english')} aria-current={lang === 'en' ? 'page' : undefined}>EN</Link>
            <span aria-hidden="true">/</span>
            <Link to={languageTarget('es')} lang="es" hrefLang="es"
              aria-label={t('language.spanish')} aria-current={lang === 'es' ? 'page' : undefined}>ES</Link>
          </nav>
          <button ref={menuButtonRef} className="menu-toggle" type="button"
            aria-expanded={menuOpen} aria-controls="primary-navigation"
            aria-label={t(menuOpen ? 'navigation.closeMenu' : 'navigation.openMenu')}
            onClick={() => setMenuLocation(menuOpen ? null : locationKey)}>
            <span className="menu-line" aria-hidden="true" />
            <span className="menu-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
