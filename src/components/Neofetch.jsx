import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { profile, projects, techStack } from '../data'
import { themes } from '../lib/theme'
import TerminalWindow from './TerminalWindow'

const ASCII = String.raw` ____   ____
|  _ \ / ___|
| |_) | |  _
|  __/| |_| |
|_|    \____|`

const pad = (n) => String(n).padStart(2, '0')

function uptime(start, now) {
  let y = now.getFullYear() - start.getFullYear()
  let m = now.getMonth() - start.getMonth()
  let d = now.getDate() - start.getDate()
  if (d < 0) {
    m -= 1
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
  }
  if (m < 0) {
    y -= 1
    m += 12
  }
  const secs = Math.floor((now - start) / 1000) % 86400
  const clock = `${pad(Math.floor(secs / 3600))}:${pad(Math.floor((secs % 3600) / 60))}:${pad(secs % 60)}`
  return `${y}y ${m}m ${d}d ${clock}`
}

// Linux "neofetch"-style system card with a live career uptime counter.
function Neofetch() {
  const [now, setNow] = useState(() => new Date())
  const start = new Date(profile.careerStart)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const rows = [
    ['OS', 'MERN Stack x86_64'],
    ['Host', profile.location],
    ['Uptime', uptime(start, now)],
    ['Shell', 'node --experimental-everything'],
    ['Packages', `${techStack.length} (npm), ${projects.length} projects`],
    ['Editor', profile.editor],
    ['Role', profile.role],
    ['Coffee', '█████████░ 90%'],
    ['Status', profile.available ? 'open to work ●' : 'busy'],
  ]

  return (
    <TerminalWindow title={`${profile.handle}@portfolio: ~ — neofetch`}>
      <div className="flex gap-7 text-[13.5px] max-phone:flex-col max-phone:gap-[14px] max-phone:text-[12.5px]">
        <pre className="m-0 font-mono text-[13px] leading-[1.25] text-green [text-shadow:var(--glow-green)]">{ASCII}</pre>
        <div className="[&_p]:overflow-hidden [&_p]:text-ellipsis [&_p]:whitespace-nowrap">
          <p>
            <span className="text-green">{profile.handle}</span>@<span className="text-green">portfolio</span>
          </p>
          <p className="text-muted">{'-'.repeat(profile.handle.length + 10)}</p>
          {rows.map(([k, v], i) => (
            <motion.p
              key={k}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <span className="text-cyan">{k}</span>: {v}
            </motion.p>
          ))}
          <div className="mt-3 flex">
            {Object.values(themes).flatMap((t) => [t.primary, t.secondary]).map((c, i) => (
              <span key={i} className="h-[14px] w-[22px]" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </TerminalWindow>
  )
}

export default Neofetch
