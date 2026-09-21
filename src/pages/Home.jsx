import { useState } from 'react'
import Hero from '../components/Hero.jsx'
import ProjectIndex from '../components/ProjectIndex.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import AboutPreview from '../components/AboutPreview.jsx'
import { professionalProjects } from '../data/projects.js'
import { freestylePieces } from '../data/freestyle.js'

export default function Home() {
  const [filter, setFilter] = useState('featured')
  const projects = filter === 'freestyle'
    ? freestylePieces
    : filter === 'featured'
      ? professionalProjects.filter((project) => project.featured)
      : professionalProjects

  return (
    <>
      <Hero />
      <section id="projects" className="section stack" tabIndex={-1} aria-labelledby="projects-title">
        <ProjectIndex activeFilter={filter} onFilterChange={setFilter} />
        <ProjectGrid projects={projects} />
      </section>
      <AboutPreview />
    </>
  )
}

