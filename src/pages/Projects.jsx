import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { projectFilters, projects } from '../data'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { usePageTitle } from '../lib/hooks'

function ProjectsPage() {
  usePageTitle('Projects')
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="page">
      <SectionHeading
        index="02"
        title="Projects"
        subtitle="Things I've built — from REST APIs to real-time apps. Hover a card, it's alive."
      />

      <div className="mb-9 flex flex-wrap items-center gap-2 max-phone:mb-6" role="tablist">
        {projectFilters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`relative rounded-lg border bg-panel px-4 py-2 text-[13px] max-xs:px-3 max-xs:text-[12px] [transition:color_0.2s] ${
              filter === f ? 'border-green text-bg' : 'border-line text-muted hover:text-fg'
            }`}
            onClick={() => setFilter(f)}
          >
            {filter === f && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-[7px] bg-green shadow-(--glow-green)" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
            )}
            <span className="relative">--{f.toLowerCase()}</span>
          </button>
        ))}
        <span className="ml-auto text-[12px] text-muted max-xs:ml-0 max-xs:basis-full">
          {visible.length} result{visible.length !== 1 && 's'}
        </span>
      </div>

      <motion.div layout className="grid-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ProjectsPage
