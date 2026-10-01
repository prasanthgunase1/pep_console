import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { isTouchDevice, useReducedMotion } from '../lib/hooks'

const INTERACTIVE = 'a, button, [role="tab"], [data-cursor="hover"]'
const TEXT_FIELDS = 'input, textarea'
const SIZE = 30
const PAD = 7
const TRAIL_GLYPHS = '01{}<>/;=$#*'.split('')

const labelFor = (el) => {
  if (el.dataset.cursorLabel) return el.dataset.cursorLabel
  if (el.tagName === 'A') return el.target === '_blank' || el.href?.startsWith('mailto:') ? 'open ↗' : 'goto'
  return 'exec'
}

// Target-lock cursor: corner brackets snap around links/buttons, code glyphs trail behind.
// Bracket/glyph styles: .tc-* in index.css
function TargetCursor() {
  const reduced = useReducedMotion()
  const [enabled] = useState(() => !isTouchDevice())
  const [label, setLabel] = useState(null)
  const [locked, setLocked] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [hidden, setHidden] = useState(true)
  const trailRef = useRef(null)
  const targetRef = useRef(null)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const spring = { stiffness: 520, damping: 38, mass: 0.6 }
  const x = useSpring(useMotionValue(-100), spring)
  const y = useSpring(useMotionValue(-100), spring)
  const w = useSpring(useMotionValue(SIZE), spring)
  const h = useSpring(useMotionValue(SIZE), spring)

  useEffect(() => {
    if (!enabled || reduced) return
    const root = document.documentElement
    root.classList.add('has-target-cursor')
    let last = { x: -100, y: -100 }
    let lastTrail = { x: 0, y: 0 }
    let overField = null // only re-render when this actually changes

    const frame = () => {
      const t = targetRef.current
      if (t && t.isConnected) {
        const r = t.getBoundingClientRect()
        x.set(r.left - PAD)
        y.set(r.top - PAD)
        w.set(r.width + PAD * 2)
        h.set(r.height + PAD * 2)
      } else {
        x.set(last.x - SIZE / 2)
        y.set(last.y - SIZE / 2)
        w.set(SIZE)
        h.set(SIZE)
      }
    }

    const spawnGlyph = (cx, cy) => {
      const box = trailRef.current
      if (!box || Math.hypot(cx - lastTrail.x, cy - lastTrail.y) < 46) return
      lastTrail = { x: cx, y: cy }
      if (box.childElementCount > 24) box.firstChild.remove()
      const g = document.createElement('span')
      g.className = 'tc-glyph'
      g.textContent = TRAIL_GLYPHS[Math.floor(Math.random() * TRAIL_GLYPHS.length)]
      g.style.left = `${cx}px`
      g.style.top = `${cy}px`
      g.addEventListener('animationend', () => g.remove())
      box.appendChild(g)
    }

    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY }
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      const field = Boolean(e.target.closest?.(TEXT_FIELDS))
      if (field !== overField) {
        overField = field
        setHidden(field)
      }

      const t = e.target.closest?.(INTERACTIVE) ?? null
      if (t !== targetRef.current) {
        targetRef.current = t
        setLocked(Boolean(t))
        setLabel(t ? labelFor(t) : null)
      }
      frame()
      if (!t) spawnGlyph(e.clientX, e.clientY)
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => {
      overField = null
      setHidden(true)
    }
    const onScroll = () => frame()

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      root.classList.remove('has-target-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, reduced, x, y, w, h, dotX, dotY])

  if (!enabled || reduced) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-9999 [transition:opacity_0.2s] ${hidden ? 'opacity-0' : ''}`}
      aria-hidden="true"
    >
      <div ref={trailRef} />
      <motion.div
        className={`tc-frame fixed top-0 left-0 ${locked ? 'tc-frame--locked' : ''} ${pressed ? 'tc-frame--pressed' : ''}`}
        style={{ x, y, width: w, height: h }}
      >
        <span className="tc-corner tc-corner--tl" />
        <span className="tc-corner tc-corner--tr" />
        <span className="tc-corner tc-corner--bl" />
        <span className="tc-corner tc-corner--br" />
        {label && (
          <span className="tc-label absolute bottom-[calc(100%+6px)] left-0 bg-cyan px-[6px] py-px font-mono text-[10px] tracking-[0.06em] whitespace-nowrap text-bg">
            [ {label} ]
          </span>
        )}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 -mt-[2px] -ml-[2px] h-1 w-1 bg-green shadow-[0_0_6px_var(--green)]"
        style={{ x: dotX, y: dotY }}
      />
    </div>
  )
}

export default TargetCursor
