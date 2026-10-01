import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'

// Animated mouse "scroll" hint under the hero; fades out once the user scrolls.
function ScrollCue({ show = true }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80))

  return (
    <motion.div
      className="pointer-events-none mt-6 flex flex-col items-center gap-2 text-[11px] tracking-[0.2em] text-muted uppercase max-tab:hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: show && !scrolled ? 1 : 0, y: show && !scrolled ? 0 : -10 }}
      transition={{ duration: 0.5, delay: show && !scrolled ? 1.2 : 0 }}
      aria-hidden="true"
    >
      <span className="relative block h-[38px] w-[24px] rounded-full border-2 border-[rgba(var(--green-rgb),0.6)]">
        <span className="cue-wheel absolute top-[7px] left-1/2 h-[7px] w-[3px] -translate-x-1/2 rounded-full bg-green shadow-(--glow-green)" />
      </span>
      scroll
    </motion.div>
  )
}

export default ScrollCue
