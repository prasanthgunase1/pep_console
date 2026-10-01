import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Wrapper that pulls its child toward the cursor.
function MagneticButton({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.95 }}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton
