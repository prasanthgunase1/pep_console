import { useEffect, useState, useRef } from 'react'
import { useMotionValue, useReducedMotion as useMotionReduced } from 'motion/react'
import { profile } from '../data'

export function useTypewriter(words, { typeSpeed = 70, deleteSpeed = 40, pause = 1600 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timeout

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      timeout = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => i + 1)
      }, 200)
    } else {
      timeout = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

export function useMousePosition() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return { x, y }
}

export function useReducedMotion() {
  return Boolean(useMotionReduced())
}

export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches

// combo examples: 'mod+k', 'escape'
export function useKeyPress(combo, handler) {
  const handlerRef = useRef(handler)
  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    const parts = combo.toLowerCase().split('+')
    const key = parts.pop()
    const needsMod = parts.includes('mod')

    const onKey = (e) => {
      if (e.key.toLowerCase() !== key) return
      if (needsMod && !(e.ctrlKey || e.metaKey)) return
      handlerRef.current(e)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [combo])
}

// ─── Boot screen ──────────────────────────────────────────────
export const BOOT_KEY = 'portfolio-booted'
export const BOOT_EVENT = 'boot-done'

const hasBooted = () => {
  try {
    return sessionStorage.getItem(BOOT_KEY) === '1'
  } catch {
    return true
  }
}

// true once the BootLoader has finished (immediately on repeat visits)
export function useBootDone() {
  const [done, setDone] = useState(hasBooted)

  useEffect(() => {
    if (done) return
    const onDone = () => setDone(true)
    window.addEventListener(BOOT_EVENT, onDone)
    return () => window.removeEventListener(BOOT_EVENT, onDone)
  }, [done])

  return done
}

// ─── Document title ───────────────────────────────────────────
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} | ${profile.role}`
  }, [title])
}
