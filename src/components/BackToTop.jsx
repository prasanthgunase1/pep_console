import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'

// Floating "cd ~ ↑" button that appears after scrolling down.
function BackToTop() {
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 600))

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="fixed right-6 bottom-6 z-90 inline-flex items-center gap-2 rounded-lg border border-green bg-[rgba(var(--bg-rgb),0.85)] px-4 py-2.5 font-mono text-[13px] text-green shadow-(--glow-green) backdrop-blur-[6px] [transition:background_0.25s,color_0.25s] hover:bg-green hover:text-bg max-phone:right-4 max-phone:bottom-4 max-phone:px-3 max-phone:py-2 max-phone:text-[12px]"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          data-cursor-label="top"
        >
          cd ~ <span aria-hidden="true">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
