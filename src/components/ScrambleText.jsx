import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useReducedMotion } from '../lib/hooks'

const CHARS = '!<>-_\\/[]{}=+*^?#01ABCDEFXZ'

// "Decrypts" text: random glyphs resolve left-to-right into the real string.
// Replays on hover.
function ScrambleText({ text, className = '', duration = 1100, delay = 0 }) {
  const ref = useRef(null)
  const frameRef = useRef(0)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [output, setOutput] = useState(text)

  const run = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    const start = performance.now() + delay
    const tick = (now) => {
      const p = Math.max(0, Math.min(1, (now - start) / duration))
      const revealed = Math.floor(p * text.length)
      setOutput(
        text
          .split('')
          .map((c, i) => (i < revealed || c === ' ' ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(''),
      )
      if (p < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
  }, [text, duration, delay])

  useEffect(() => {
    if (inView && !reduced) run()
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, reduced, run])

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onMouseEnter={reduced ? undefined : run}
    >
      <span aria-hidden="true">{output}</span>
    </span>
  )
}

export default ScrambleText
