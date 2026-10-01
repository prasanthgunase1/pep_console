import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../lib/hooks'

const ease = [0.76, 0, 0.24, 1]
const wipeClass = 'pt-wipe pointer-events-none fixed inset-0 z-150 grid place-items-center'

// "$ cd ~/page" scanline wipe between routes.
function PageTransition({ children }) {
  const reduced = useReducedMotion()
  const { pathname } = useLocation()
  const label = pathname === '/' ? '~' : `~${pathname}`

  if (reduced) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, delay: 0.35 } }}
        exit={{ opacity: 0, y: -16, filter: 'blur(6px)', transition: { duration: 0.3 } }}
      >
        {children}
      </motion.div>

      {/* wipe that reveals the incoming page */}
      <motion.div
        className={wipeClass}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.55, ease, delay: 0.1 } }}
        exit={{ scaleY: 0 }}
        style={{ originY: 0 }}
      >
        <span className="text-[clamp(16px,3vw,26px)] tracking-[0.05em] text-fg">
          <span className="text-green">$</span> cd {label}
        </span>
      </motion.div>

      {/* wipe that covers the outgoing page */}
      <motion.div
        className={wipeClass}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.4, ease } }}
        style={{ originY: 1 }}
      />
    </>
  )
}

export default PageTransition
