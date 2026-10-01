import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FaArrowRight } from 'react-icons/fa6'
import { profile, projects, services, stats } from '../data'
import GlitchText from '../components/GlitchText'
import TypingText from '../components/TypingText'
import TerminalWindow from '../components/TerminalWindow'
import MagneticButton from '../components/MagneticButton'
import StatCounter from '../components/StatCounter'
import TechMarquee from '../components/TechMarquee'
import SectionHeading from '../components/SectionHeading'
import ScrambleText from '../components/ScrambleText'
import Neofetch from '../components/Neofetch'
import SkillSphere from '../components/SkillSphere'
import ProjectCard from '../components/ProjectCard'
import ServiceCard from '../components/ServiceCard'
import ScrollCue from '../components/ScrollCue'
import { useBootDone, usePageTitle } from '../lib/hooks'
import { openCommandPalette } from '../lib/theme'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const termLines = [
  { delay: 0.6, node: <><span className="text-green">❯</span> whoami</> },
  { delay: 1.1, node: <span className="text-muted">{profile.name.toLowerCase().replace(/\s+/g, '_')}</span> },
  { delay: 1.6, node: <><span className="text-green">❯</span> cat stack.json</> },
  { delay: 2.0, node: <span>{'{'}</span> },
  { delay: 2.2, node: <>  <span className="text-cyan">"frontend"</span>: <span className="text-yellow">["React", "Redux", "Tailwind", "MUI"]</span>,</> },
  { delay: 2.4, node: <>  <span className="text-cyan">"backend"</span>: <span className="text-yellow">["Node.js", "Express", "REST APIs"]</span>,</> },
  { delay: 2.6, node: <>  <span className="text-cyan">"database"</span>: <span className="text-yellow">["MongoDB", "PostgreSQL", "Snowflake"]</span>,</> },
  { delay: 2.8, node: <>  <span className="text-cyan">"experience"</span>: <span className="text-magenta">"4+ years"</span>,</> },
  { delay: 3.0, node: <>  <span className="text-cyan">"openToWork"</span>: <span className="text-magenta">{String(profile.available)}</span></> },
  { delay: 3.2, node: <span>{'}'}</span> },
  { delay: 3.5, node: <span className="text-green blink-cursor">❯ </span> },
]

function HomePage() {
  const featured = projects.filter((p) => p.featured)
  // hold hero animations until the boot screen has closed, so they're actually seen
  const ready = useBootDone()
  usePageTitle()

  return (
    <div className="page">
      <section className="grid min-h-[calc(100svh-200px)] grid-cols-[1.1fr_1fr] items-center gap-14 max-lap:gap-10 max-tab:min-h-0 max-tab:grid-cols-1 max-tab:gap-12 max-phone:gap-10 short:min-h-0 ultra:gap-20 qhd:gap-28 lowh:min-h-[calc(100svh-150px)]">
        <motion.div variants={container} initial="hidden" animate={ready ? 'show' : 'hidden'}>
          {profile.available && (
            <motion.span variants={item} className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(var(--green-rgb),0.35)] bg-[rgba(var(--green-rgb),0.06)] px-[14px] py-[6px] text-[12px] text-green">
              <span className="hero-pulse h-2 w-2 rounded-full bg-green" /> available for new opportunities
            </motion.span>
          )}
          <motion.p variants={item} className="mt-[26px] text-muted lowh:mt-4">
            <span className="text-green">&gt;</span> Hello world, I&apos;m
          </motion.p>
          <motion.h1 variants={item} className="mt-2 flex flex-col text-[clamp(40px,6.4vw,78px)] leading-[1.02] max-xs:text-[34px] ultra:text-[96px] qhd:text-[124px] lowh:text-[60px] font-bold tracking-[-0.02em] text-(--heading) [text-shadow:0_0_30px_rgba(var(--green-rgb),0.25)]">
            <GlitchText text={profile.firstName} className="self-start">
              <ScrambleText text={profile.firstName} delay={500} start={ready} />
            </GlitchText>
            <ScrambleText text={profile.lastName} delay={800} duration={1400} start={ready} className="text-transparent [-webkit-text-stroke:1.5px_var(--green)] [filter:drop-shadow(0_0_10px_rgba(var(--green-rgb),0.45))] [text-shadow:none] [transition:color_0.4s] hover:text-green" />
          </motion.h1>
          <motion.h2 variants={item} className="mt-3 min-h-[1.3em] font-mono text-[clamp(18px,2.6vw,26px)] font-medium max-xs:text-[16px] ultra:text-[30px] qhd:text-[38px] lowh:text-[22px]">
            <TypingText words={profile.roles} className="text-cyan" />
          </motion.h2>
          <motion.p variants={item} className="mt-5 max-w-[520px] text-[16px] text-muted max-xs:text-[14px] ultra:max-w-[640px] ultra:text-[18px] qhd:max-w-[780px] qhd:text-[21px]">
            {profile.tagline}
          </motion.p>
          <motion.div variants={item} className="mt-[34px] flex flex-wrap gap-4 max-xs:gap-3 lowh:mt-6">
            <MagneticButton>
              <Link to="/projects" className="btn">
                view_projects() <FaArrowRight />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/contact" className="btn btn--cyan">
                hire_me()
              </Link>
            </MagneticButton>
          </motion.div>
          <motion.button variants={item} className="mt-[26px] border-none bg-transparent p-0 text-left text-[12px] text-muted hover:text-green [&_kbd]:rounded-[4px] [&_kbd]:border [&_kbd]:border-b-2 [&_kbd]:border-line [&_kbd]:px-[6px] [&_kbd]:py-px [&_kbd]:font-mono [&_kbd]:text-fg" onClick={openCommandPalette}>
            psst… press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open my terminal
          </motion.button>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, rotateY: -25, x: 60 }}
          animate={ready ? { opacity: 1, rotateY: 0, x: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          style={{ transformPerspective: 1000 }}
        >
          <div className="hero-orb absolute -inset-10 -z-1" />
          <TerminalWindow title={`${profile.handle}@portfolio: ~`}>
            <pre className="m-0 min-h-[300px] font-mono text-[13.5px] leading-[1.75] whitespace-pre-wrap max-phone:min-h-0 max-phone:text-[12px] max-xs:text-[11px] ultra:text-[15px] qhd:text-[18px] lowh:min-h-[250px] lowh:leading-[1.6]">
              {ready && termLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: line.delay, duration: 0.2 }}
                >
                  {line.node}
                </motion.div>
              ))}
            </pre>
          </TerminalWindow>
        </motion.div>
      </section>

      <ScrollCue show={ready} />

      <section className="mt-[60px] grid grid-cols-4 gap-5 max-lap:gap-4 max-tab:grid-cols-2 max-phone:mt-12 max-phone:gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCounter {...s} />
          </motion.div>
        ))}
      </section>

      <section className="section">
        <TechMarquee />
      </section>

      <section className="section">
        <SectionHeading index="01" title="System Info" subtitle="$ neofetch — hover or swipe the globe to spin my stack" />
        <div className="grid grid-cols-[1.1fr_1fr] items-center gap-10 max-lap:grid-cols-[1.2fr_1fr] max-tab:grid-cols-1 max-tab:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <Neofetch />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <SkillSphere />
          </motion.div>
        </div>
      </section>

      <section className="section">
        <SectionHeading index="02" title="What I Do" subtitle="end-to-end MERN — from database schema to deploy pipeline" />
        <div className="grid-3">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <ServiceCard service={svc} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading index="03" title="Featured Work" />
        <div className="grid-3">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
        <div className="mt-11 flex justify-center">
          <Link to="/projects" className="btn">
            ls ./projects --all <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
