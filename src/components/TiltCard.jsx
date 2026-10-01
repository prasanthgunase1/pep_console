import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

// 3D tilt that follows the mouse, with a spotlight gradient (.tilt-spot in index.css).
function TiltCard({ children, accent = 'var(--green)', className = '', ...rest }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 200, damping: 18 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    px.set(nx)
    py.set(ny)
    ref.current.style.setProperty('--mx', `${nx * 100}%`)
    ref.current.style.setProperty('--my', `${ny * 100}%`)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={`group relative h-full overflow-hidden rounded-(--radius) border border-line bg-panel [transform-style:preserve-3d] [transition:border-color_0.3s,box-shadow_0.3s] hover:border-(--accent) hover:shadow-[0_0_0_1px_var(--accent),0_20px_50px_-20px_var(--accent)] ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900, '--accent': accent }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      <div className="tilt-spot pointer-events-none absolute inset-0 opacity-0 [transition:opacity_0.3s] group-hover:opacity-100" />
      <div className="relative h-full [transform:translateZ(30px)]">{children}</div>
    </motion.div>
  )
}

export default TiltCard
