import { useTranslation } from 'react-i18next'

const projectFilters = ['featured', 'projects', 'freestyle']

export default function ProjectIndex({ activeFilter, onFilterChange }) {
  const { t } = useTranslation()
  return (
    <div className="stack">
      <h2 id="projects-title">{t('projectIndex.title')}</h2>
      <div className="filter-controls" role="group" aria-label={t('projectIndex.label')}>
        {projectFilters.map((filter) => (
          <button key={filter} type="button" aria-pressed={activeFilter === filter}
            aria-controls="project-results" onClick={() => onFilterChange(filter)}>
            {t(`projectIndex.filters.${filter}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
