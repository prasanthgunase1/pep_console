import { motion } from 'motion/react'
import ScrambleText from './ScrambleText'

// "// 01. Title ───" heading that reveals on scroll.
function SectionHeading({ index, title, subtitle }) {
  return (
    <motion.div
      className="mb-10 flex flex-wrap items-center gap-[14px]"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="text-[15px] text-green">// {index}.</span>
      <h2 className="text-[clamp(26px,4vw,38px)]">
        <ScrambleText text={title} delay={150} />
      </h2>
      <motion.span
        className="h-px min-w-[60px] flex-1 origin-left bg-[linear-gradient(90deg,var(--green),transparent)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
      />
      {subtitle && <p className="basis-full text-muted">{subtitle}</p>}
    </motion.div>
  )
}

export default SectionHeading
