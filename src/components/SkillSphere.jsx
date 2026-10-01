import { useEffect, useRef } from 'react'
import { techStack } from '../data'
import { techIcons } from '../lib/icons'
import { useReducedMotion } from '../lib/hooks'

const IDLE = { x: 0.002, y: 0.004 }

// A 3D tag-cloud globe. Mouse position steers rotation direction & speed.
function SkillSphere() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    const nodes = [...el.querySelectorAll('[data-sphere-item]')]
    const n = nodes.length
    // evenly distribute points on a sphere (fibonacci lattice)
    const pts = nodes.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n)
      const theta = Math.sqrt(n * Math.PI) * phi
      return { x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) }
    })

    let radius = el.offsetWidth * 0.38
    let speed = { ...IDLE }
    let target = { ...IDLE }
    let frame

    const render = () => {
      pts.forEach((p, i) => {
        const scale = (p.z + 2) / 3
        const node = nodes[i]
        node.style.transform = `translate(-50%, -50%) translate3d(${p.x * radius}px, ${p.y * radius}px, 0) scale(${scale})`
        node.style.opacity = String(0.25 + ((p.z + 1) / 2) * 0.75)
        node.style.zIndex = String(Math.round(scale * 100))
      })
    }

    const rotate = () => {
      speed.x += (target.x - speed.x) * 0.05
      speed.y += (target.y - speed.y) * 0.05
      const [cx, sx, cy, sy] = [Math.cos(speed.x), Math.sin(speed.x), Math.cos(speed.y), Math.sin(speed.y)]
      pts.forEach((p) => {
        const y1 = p.y * cx - p.z * sx
        const z1 = p.y * sx + p.z * cx
        const x2 = p.x * cy + z1 * sy
        const z2 = -p.x * sy + z1 * cy
        p.x = x2
        p.y = y1
        p.z = z2
      })
      render()
      frame = requestAnimationFrame(rotate)
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
      target = { x: -dy * 0.025, y: dx * 0.025 }
    }
    const onLeave = () => {
      target = { ...IDLE }
    }
    const onResize = () => {
      radius = el.offsetWidth * 0.38
      render()
    }

    render()
    if (!reduced) frame = requestAnimationFrame(rotate)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] select-none" ref={ref} aria-label="Tech stack globe">
      <div className="sphere-core" />
      {techStack.map((name) => {
        const Icon = techIcons[name]
        return (
          <span
            key={name}
            data-sphere-item
            className="absolute top-1/2 left-1/2 inline-flex items-center gap-[6px] rounded-full border border-line bg-[rgba(11,16,22,0.85)] px-2.5 py-1 text-[13px] whitespace-nowrap text-fg will-change-[transform,opacity] [transition:color_0.2s,border-color_0.2s] hover:border-green hover:text-green [&_svg]:text-green"
          >
            {Icon && <Icon />}
            {name}
          </span>
        )
      })}
    </div>
  )
}

export default SkillSphere
