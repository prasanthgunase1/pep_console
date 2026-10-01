import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'
import { getCssVar } from '../lib/theme'

const GLYPHS = '01{}[]<>/=;:$#&*+MERNmern'.split('')
const FONT_SIZE = 16
const FPS = 24

// Falling code glyphs on a background canvas (colors follow the active theme).
function MatrixRain() {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let drops = []
    let frame
    let last = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const cols = Math.ceil(canvas.width / FONT_SIZE)
      drops = Array.from({ length: cols }, () => Math.random() * -50)
    }

    const draw = (t) => {
      frame = requestAnimationFrame(draw)
      if (document.hidden || t - last < 1000 / FPS) return
      last = t

      ctx.fillStyle = 'rgba(5, 7, 10, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FONT_SIZE}px JetBrains Mono, monospace`
      const primary = getCssVar('--green') || '#39ff14'
      const secondary = getCssVar('--cyan') || '#00e5ff'

      drops.forEach((y, i) => {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ctx.fillStyle = Math.random() > 0.975 ? secondary : primary
        ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE)
        drops[i] = y * FONT_SIZE > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.09]"
    />
  )
}

export default MatrixRain
