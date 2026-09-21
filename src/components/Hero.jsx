import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../config/siteConfig.js'
import './Hero.css'

export default function Hero() {
  const { t } = useTranslation()
  const { lang } = useParams()

  return (
    <section className="hero" aria-labelledby="intro-title">
      <div className="hero-main">
        <p className="hero-eyebrow">{t('hero.eyebrow', { name: siteConfig.name })}</p>
        <h1 id="intro-title" className="hero-headline">{t('hero.headline')}</h1>
      </div>
      <div className="hero-secondary">
        <p className="hero-description">{t('hero.description')}</p>
        <div className="hero-profile">
          <p>{t(siteConfig.profile.locationKey)}</p>
          <p>{t(siteConfig.profile.availabilityKey)}</p>
          <p className="hero-disciplines">{t(siteConfig.profile.disciplinesKey)}</p>
        </div>
      </div>
      <nav className="hero-links" aria-label={t('hero.linksLabel')}>
        <Link className="editorial-link" to={`/${lang}#projects`}>
          <span>{t('hero.selectedWork')}</span><span aria-hidden="true">↘</span>
        </Link>
        {Object.entries(siteConfig.links).map(([key, link]) => (
          link.href && link.status === 'ready' ? (
            <a key={key} className="editorial-link" href={link.href}>
              <span>{t(`hero.${key}`)}</span><span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span key={key} className="editorial-link editorial-link-pending" aria-disabled="true">
              <span>{t(`hero.${key}`)}</span>
              <span className="link-pending-label">{t('hero.pending')}</span>
            </span>
          )
        ))}
      </nav>
    </section>
  )
}
