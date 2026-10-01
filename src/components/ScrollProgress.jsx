import { motion, useScroll, useSpring } from 'motion/react'

// Gradient bar at the top that fills as you scroll.
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-200 h-[3px] origin-left bg-[linear-gradient(90deg,var(--green),var(--cyan),var(--magenta))] shadow-(--glow-green)"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress
