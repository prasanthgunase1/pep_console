import { Link } from 'react-router-dom'
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import TiltCard from './TiltCard'

// "ShopSphere" -> "SS", "AuthForge API" -> "AF"
const monogram = (title) => (title.match(/[A-Z]/g) || [title[0]]).slice(0, 2).join('')

function ProjectCard({ project }) {
  return (
    <TiltCard accent={project.accent}>
      <article className="flex h-full flex-col">
        {/* generated preview banner (styles: .pc-banner / .pc-sweep in index.css) */}
        <Link
          to={`/projects/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="pc-banner relative flex h-[120px] items-center justify-center overflow-hidden border-b border-line"
        >
          <span className="absolute top-3 left-3.5 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </span>
          <span className="absolute top-2.5 right-3.5 font-mono text-[11px] text-muted">{project.category}</span>
          <span className="relative flex items-baseline gap-2 font-mono font-bold" style={{ color: project.accent }}>
            <span className="text-[18px] opacity-70">&lt;/&gt;</span>
            <span className="text-[44px] leading-none tracking-[-0.04em] [text-shadow:0_0_24px_currentColor]">
              {monogram(project.title)}
            </span>
          </span>
          <span className="pc-sweep pointer-events-none absolute inset-0" />
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between text-[13px]">
            <span style={{ color: project.accent }}>./{project.slug}</span>
            <div className="flex gap-[14px] text-[17px] text-muted [&_a:hover]:text-fg">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live demo">
                  <FaArrowUpRightFromSquare />
                </a>
              )}
            </div>
          </div>
          <Link to={`/projects/${project.slug}`} className="shimmer-text mt-5 self-start font-head text-[23px] font-bold">
            {project.title}
          </Link>
          <p className="mt-2.5 flex-1 text-[14px] text-muted">{project.description}</p>
          <div className="mt-[18px] flex flex-wrap gap-x-3 gap-y-[6px] text-[12px] text-cyan">
            {project.stack.map((s) => (
              <span key={s}>#{s}</span>
            ))}
          </div>
          <Link
            to={`/projects/${project.slug}`}
            className="mt-[18px] text-[13px] hover:underline"
            style={{ color: project.accent }}
          >
            cat README.md →
          </Link>
        </div>
      </article>
    </TiltCard>
  )
}

export default ProjectCard
