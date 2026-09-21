import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer id="contact" className="site-footer container stack" tabIndex={-1} aria-labelledby="contact-title">
      <h2 id="contact-title">{t('footer.title')}</h2>
      <p className="provisional">{t('footer.description')}</p>
      <p>Ricardo Plata</p>
    </footer>
  )
}

