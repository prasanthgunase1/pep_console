import { Link } from 'react-router-dom'
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import TiltCard from './TiltCard'

function ProjectCard({ project }) {
  return (
    <TiltCard accent={project.accent}>
      <article className="flex h-full flex-col p-6">
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
        <Link to={`/projects/${project.slug}`} className="mt-5 font-head text-[23px] font-bold">
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
      </article>
    </TiltCard>
  )
}

export default ProjectCard
