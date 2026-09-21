import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <section className="section stack" aria-labelledby="intro-title">
      <h1 id="intro-title">Ricardo Plata</h1>
      <p>{t('hero.description')}</p>
      <p className="provisional">{t('hero.placeholder')}</p>
    </section>
  )
}

