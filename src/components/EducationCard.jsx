import { motion } from 'motion/react'
import TerminalWindow from './TerminalWindow'

// Degree card styled as a `cat degree.json` terminal output.
function EducationCard({ item }) {
  const rows = [
    ['degree', item.degree],
    ['specialisation', item.field],
    ['institute', item.institute],
    ['university', item.university],
    ['type', item.type],
    ['period', item.period],
  ]

  return (
    <TerminalWindow title={`~/education/${item.hash}.json`}>
      <div className="flex items-start justify-between gap-6 max-phone:flex-col max-phone:gap-4">
        <pre className="m-0 min-w-0 flex-1 font-mono text-[13.5px] leading-[1.8] whitespace-pre-wrap max-phone:text-[12px]">
          <span className="text-green">❯</span> cat degree.json{'\n'}
          {'{'}
          {'\n'}
          {rows.map(([k, v], i) => (
            <motion.span
              key={k}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              {'  '}
              <span className="text-cyan">"{k}"</span>: <span className="text-yellow">"{v}"</span>
              {i < rows.length - 1 ? ',' : ''}
              {'\n'}
            </motion.span>
          ))}
          {'}'}
        </pre>

        <motion.div
          className="grid shrink-0 place-items-center rounded-(--radius) border border-[rgba(var(--green-rgb),0.4)] bg-[rgba(var(--green-rgb),0.06)] px-6 py-5 text-center shadow-(--glow-green) max-phone:w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.4 }}
        >
          <span className="font-head text-[40px] leading-none font-bold text-green">{item.gpa}</span>
          <span className="mt-2 text-[11px] tracking-[0.12em] text-muted uppercase">CGPA / 10</span>
        </motion.div>
      </div>
    </TerminalWindow>
  )
}

export default EducationCard
