import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'
import { getCssVar, THEME_EVENT } from '../lib/theme'

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
    let primary = '#39ff14'
    let secondary = '#00e5ff'
    let fade = 'rgba(5, 7, 10, 0.12)'
    const readColors = () => {
      primary = getCssVar('--green') || primary
      secondary = getCssVar('--cyan') || secondary
      fade = `rgba(${getCssVar('--bg-rgb') || '5, 7, 10'}, 0.12)` // trail fade matches dark/light background
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const cols = Math.ceil(canvas.width / FONT_SIZE)
      drops = Array.from({ length: cols }, () => Math.random() * -50)
      ctx.font = `${FONT_SIZE}px JetBrains Mono, monospace` // resizing resets canvas state
    }

    const draw = (t) => {
      frame = requestAnimationFrame(draw)
      if (document.hidden || t - last < 1000 / FPS) return
      last = t

      ctx.fillStyle = fade
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drops.forEach((y, i) => {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ctx.fillStyle = Math.random() > 0.975 ? secondary : primary
        ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE)
        drops[i] = y * FONT_SIZE > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
    }

    resize()
    readColors()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    window.addEventListener('resize', resize)
    window.addEventListener(THEME_EVENT, readColors)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener(THEME_EVENT, readColors)
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
