import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

// Number that counts up when scrolled into view.
function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1 rounded-(--radius) border border-line bg-[linear-gradient(160deg,var(--panel),transparent)] p-[22px] max-phone:p-[18px] max-xs:p-3.5"
    >
      <span className="font-head text-[clamp(30px,4vw,44px)] font-bold max-xs:text-[24px] ultra:text-[52px] qhd:text-[64px]">
        {display.toLocaleString()}
        <span className="text-green">{suffix}</span>
      </span>
      <span className="text-[13px] tracking-[0.08em] text-muted uppercase max-xs:text-[11px] max-xs:tracking-[0.04em]">{label}</span>
    </div>
  )
}

export default StatCounter
