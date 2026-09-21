import { useTranslation } from 'react-i18next'

export default function AboutPreview() {
  const { t } = useTranslation()
  return (
    <section id="about" className="section about-layout" tabIndex={-1} aria-labelledby="about-title">
      <div className="stack">
        <h2 id="about-title">{t('about.title')}</h2>
        <p className="provisional">{t('about.description')}</p>
      </div>
      <p className="media-placeholder provisional">{t('about.photo')}</p>
    </section>
  )
}

