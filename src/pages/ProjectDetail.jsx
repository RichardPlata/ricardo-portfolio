import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { professionalProjects } from '../data/projects.js'
import { freestylePieces } from '../data/freestyle.js'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug, lang } = useParams()
  const { t } = useTranslation('projects')
  const project = [...professionalProjects, ...freestylePieces].find((item) => item.slug === slug)
  if (!project) return <NotFound />

  return (
    <article className="section stack">
      <Link to={`/${lang}#projects`}>{t('back')}</Link>
      <h1>{project.title}</h1>
      <p className="provisional">{t('detailPlaceholder')}</p>
      {project.items.length > 0 && (
        <section className="stack" aria-labelledby="collection-title">
          <h2 id="collection-title">{t('collectionTitle')}</h2>
          <ul>{project.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      )}
    </article>
  )
}
