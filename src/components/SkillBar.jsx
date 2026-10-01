import { motion } from 'motion/react'

// "$ npm i <skill>" line with a progress bar that fills on scroll.
function SkillBar({ name, level, delay = 0 }) {
  return (
    <div className="mb-4">
      <div className="mb-[6px] flex justify-between text-[13px]">
        <span>
          <span className="text-muted">$ npm i </span>
          <span className="text-cyan">{name}</span>
        </span>
        <motion.span
          className="text-green"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 1 }}
        >
          {level}% ✔
        </motion.span>
      </div>
      <div className="h-[6px] overflow-hidden rounded-[6px] bg-panel-2">
        <motion.div
          className="h-full rounded-[6px] bg-[linear-gradient(90deg,var(--green),var(--cyan))] shadow-(--glow-green)"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export default SkillBar
