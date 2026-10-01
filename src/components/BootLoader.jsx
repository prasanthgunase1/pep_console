import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data'
import { BOOT_EVENT, BOOT_KEY } from '../lib/hooks'

const LINES = [
  '[    0.000] initializing portfolio kernel…',
  '[    0.112] loading modules: react motion router',
  '[    0.248] connecting to mongodb://experience:27017 … ok',
  '[    0.391] starting express server on :4000 … ok',
  '[    0.507] hydrating react components … ok',
  '[    0.640] compiling 4 years of experience … ok',
  `[    0.788] welcome, visitor. booting ${profile.handle}.dev`,
]

const alreadyBooted = () => {
  try {
    return sessionStorage.getItem(BOOT_KEY) === '1'
  } catch {
    return false
  }
}

// Fake boot log shown once per browser session.
function BootLoader() {
  const [visible, setVisible] = useState(() => !alreadyBooted())
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    if (count < LINES.length) {
      const id = setTimeout(() => setCount((c) => c + 1), 230)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setVisible(false), 650)
    return () => clearTimeout(id)
  }, [count, visible])

  useEffect(() => {
    if (visible) return
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(BOOT_EVENT))
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const skip = () => setVisible(false)
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [visible])

  const progress = Math.round((count / LINES.length) * 100)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-1000 flex cursor-pointer flex-col justify-center bg-bg px-[max(24px,10vw)] text-[clamp(12px,1.6vw,15px)]"
          onClick={() => setVisible(false)}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.6 }}
        >
          <div className="[&_p]:my-1 [&_p]:text-muted">
            {LINES.slice(0, count).map((line) => (
              <motion.p key={line} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                {line.replace(' ok', '')}
                {line.endsWith(' ok') && <span className="text-green"> [ OK ]</span>}
              </motion.p>
            ))}
            <p className="blink-cursor" />
          </div>
          <div className="mt-7 flex max-w-[520px] items-center gap-[14px] text-green">
            <div className="h-1 flex-1 overflow-hidden rounded-[4px] bg-panel-2">
              <motion.div className="h-full bg-green shadow-(--glow-green)" animate={{ width: `${progress}%` }} />
            </div>
            <span>{progress}%</span>
          </div>
          <p className="absolute inset-x-0 bottom-[30px] text-center text-[12px] text-(--faint)">press any key to skip</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BootLoader
