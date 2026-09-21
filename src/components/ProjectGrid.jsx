import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ProjectGrid({ projects }) {
  const { t } = useTranslation('projects')
  const { lang } = useParams()
  return (
    <div id="project-results" className="stack">
      <p role="status" className="provisional">
        {projects.length === 0 ? t('empty') : t('count', { count: projects.length })}
      </p>
      {projects.length > 0 && (
        <ul className="project-grid">
          {projects.map((project) => (
            <li key={project.slug} className="stack">
              <h3><Link to={`/${lang}/work/${project.slug}`}>{project.title}</Link></h3>
              <p className="provisional">{t('cardPlaceholder')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
