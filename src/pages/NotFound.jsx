import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  const { lang } = useParams()
  return (
    <section className="section stack">
      <h1>{t('notFound.title')}</h1>
      <p className="provisional">{t('notFound.description')}</p>
      <Link to={`/${lang}`}>{t('notFound.home')}</Link>
    </section>
  )
}
