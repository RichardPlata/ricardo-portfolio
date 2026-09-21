import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function SiteLayout() {
  const { t } = useTranslation()
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : document.getElementById('main-content')
    target?.focus({ preventScroll: true })
    if (hash) target?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <a className="skip-link" href="#main-content">{t('skip')}</a>
      <Header />
      <main id="main-content" className="container" tabIndex={-1}><Outlet /></main>
      <Footer />
    </>
  )
}

