import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { projects } from '../data'
import TerminalWindow from '../components/TerminalWindow'
import MagneticButton from '../components/MagneticButton'
import NotFoundPage from './NotFound'

function ProjectDetailPage() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFoundPage />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return (
    <div className="page" style={{ '--accent': project.accent }}>
      <Link to="/projects" className="text-[13px] text-muted [transition:color_0.2s] hover:text-(--accent)">
        ← cd ../projects
      </Link>

      <motion.header
        className="relative mt-[30px] mb-[50px] overflow-hidden rounded-2xl border border-line p-11 [background:radial-gradient(circle_at_85%_10%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_55%),var(--panel)] max-phone:px-5 max-phone:py-[26px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <span className="text-[12px] tracking-[0.15em] text-(--accent) uppercase">{project.category}</span>
        <h1 className="mt-2.5 text-[clamp(36px,6vw,68px)]">{project.title}</h1>
        <p className="mt-[14px] max-w-[620px] text-[17px] text-muted">{project.description}</p>
        <div className="mt-[30px] flex flex-wrap gap-[14px]">
          {project.github && (
            <MagneticButton>
              <a href={project.github} target="_blank" rel="noreferrer" className="btn">
                <FaGithub /> source
              </a>
            </MagneticButton>
          )}
          {project.live && (
            <MagneticButton>
              <a href={project.live} target="_blank" rel="noreferrer" className="btn btn--cyan">
                <FaArrowUpRightFromSquare /> live demo
              </a>
            </MagneticButton>
          )}
        </div>
      </motion.header>

      <div className="grid grid-cols-[1.3fr_1fr] gap-6 max-tab:grid-cols-1">
        <TerminalWindow title="README.md">
          <h3 className="mb-[14px] font-mono text-[15px] text-(--accent)">## Highlights</h3>
          <ul className="tri-list m-0 pl-[18px] text-[#b3bfcc] [&_li]:mb-2.5">
            {project.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.12 }}
              >
                {h}
              </motion.li>
            ))}
          </ul>
        </TerminalWindow>

        <TerminalWindow title="package.json">
          <pre className="m-0 font-mono text-[13px] leading-[1.8] whitespace-pre-wrap">
            <span>{'{'}</span>
            {'\n'}
            {'  '}<span className="text-cyan">"name"</span>: <span className="text-yellow">"{project.slug}"</span>,
            {'\n'}
            {'  '}<span className="text-cyan">"dependencies"</span>: {'{'}
            {'\n'}
            {project.stack.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {'    '}<span className="text-cyan">"{s.toLowerCase()}"</span>: <span className="text-magenta">"latest"</span>
                {i < project.stack.length - 1 ? ',' : ''}
                {'\n'}
              </motion.span>
            ))}
            {'  }'}
            {'\n'}
            <span>{'}'}</span>
          </pre>
        </TerminalWindow>
      </div>

      <Link to={`/projects/${next.slug}`} className="group mt-[70px] flex flex-col items-end gap-[6px] border-t border-dashed border-line pt-[30px]">
        <span className="text-muted">next project →</span>
        <span className="font-head text-[clamp(26px,4vw,40px)] font-bold [transition:letter-spacing_0.3s] group-hover:tracking-[0.04em]" style={{ color: next.accent }}>
          {next.title}
        </span>
      </Link>
    </div>
  )
}

export default ProjectDetailPage
