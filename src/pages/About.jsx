import { motion } from 'motion/react'
import { FaDownload, FaLocationDot } from 'react-icons/fa6'
import { experience, profile, skills } from '../data'
import SectionHeading from '../components/SectionHeading'
import TerminalWindow from '../components/TerminalWindow'
import SkillBar from '../components/SkillBar'
import MagneticButton from '../components/MagneticButton'
import GitTimeline from '../components/GitTimeline'
import GitHeatmap from '../components/GitHeatmap'
import DevAvatar from '../components/DevAvatar'
import { usePageTitle } from '../lib/hooks'

function AboutPage() {
  usePageTitle('About')
  return (
    <div className="page">
      <SectionHeading index="01" title="About Me" />

      <div className="grid grid-cols-[1.4fr_1fr] items-center gap-[60px] max-tab:grid-cols-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <pre className="m-0 mb-5 font-mono text-[14px]">
            <span className="text-muted">/**</span>
            {'\n'}
            <span className="text-muted"> * @author </span>
            <span className="text-cyan">{profile.name}</span>
            {'\n'}
            <span className="text-muted"> * @role   </span>
            <span className="text-green">{profile.role}</span>
            {'\n'}
            <span className="text-muted"> */</span>
          </pre>
          {profile.bio.map((p, i) => (
            <motion.p
              key={i}
              className="mb-4 text-[16px] text-(--text-soft)"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
            >
              {p}
            </motion.p>
          ))}
          <p className="mt-2 mb-7 flex items-center gap-2 text-muted">
            <FaLocationDot className="text-magenta" /> {profile.location}
          </p>
          <MagneticButton>
            <a href={profile.resume} className="btn" download>
              <FaDownload /> download_resume.pdf
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-[14px] max-tab:-order-1"
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <DevAvatar />
        </motion.div>
      </div>

      <section className="section">
        <SectionHeading index="02" title="Tech Arsenal" subtitle="installed packages in my brain ⚡" />
        <div className="grid grid-cols-2 gap-6 max-tab:grid-cols-1">
          {skills.map((group, gi) => (
            <TerminalWindow key={group.group} title={`~/skills/${group.group}`}>
              {group.items.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={gi * 0.1 + i * 0.12} />
              ))}
            </TerminalWindow>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading index="03" title="Experience" />
        <GitTimeline items={experience} />
      </section>

      <section className="section">
        <SectionHeading index="04" title="Contribution Graph" subtitle="$ git log --since='1 year ago' | heatmap" />
        <GitHeatmap />
      </section>
    </div>
  )
}

export default AboutPage
