import { useMemo, useRef } from 'react'
import { useInView } from 'motion/react'

const WEEKS = 52
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// deterministic PRNG so the graph looks the same on every visit
function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGrid() {
  const rand = mulberry32(42)
  const today = new Date()
  const start = new Date(today)
  start.setDate(start.getDate() - WEEKS * 7 + 1)
  let total = 0
  const cells = []
  for (let i = 0; i < WEEKS * 7; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    const weekend = date.getDay() === 0 || date.getDay() === 6
    const r = rand()
    const count = r < (weekend ? 0.55 : 0.15) ? 0 : Math.floor(r * (weekend ? 6 : 14))
    total += count
    const level = count === 0 ? 0 : count < 4 ? 1 : count < 7 ? 2 : count < 10 ? 3 : 4
    cells.push({ date, count, level })
  }
  const monthLabels = []
  for (let w = 0; w < WEEKS; w++) {
    const d = cells[w * 7].date
    if (d.getDate() <= 7) monthLabels.push({ week: w, label: MONTHS[d.getMonth()] })
  }
  return { cells, total, monthLabels }
}

// GitHub-style contribution graph (cell colors: .heat-cell in index.css).
function GitHeatmap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const { cells, total, monthLabels } = useMemo(() => buildGrid(), [])

  return (
    <div className="rounded-(--radius) border border-line bg-panel p-6 max-phone:p-4" ref={ref}>
      <p className="mb-4 text-[14px] text-muted">
        <span className="text-green">{total.toLocaleString()}</span> contributions in the last year
      </p>
      <div className="overflow-x-auto pb-[6px]">
        <div
          className="mb-[6px] grid min-w-[720px] gap-[3px] text-[11px] text-muted"
          style={{ gridTemplateColumns: `repeat(${WEEKS}, 1fr)` }}
        >
          {monthLabels.map((m) => (
            <span key={m.week} style={{ gridColumn: m.week + 1 }}>
              {m.label}
            </span>
          ))}
        </div>
        <div
          className={`heat-grid grid min-w-[720px] grid-flow-col grid-rows-7 gap-[3px] ${inView ? 'is-visible' : ''}`}
          style={{ gridTemplateColumns: `repeat(${WEEKS}, 1fr)` }}
        >
          {cells.map((c, i) => (
            <span
              key={i}
              className={`heat-cell heat-cell--${c.level}`}
              style={{ animationDelay: `${Math.floor(i / 7) * 18}ms` }}
              title={`${c.count} contributions on ${c.date.toDateString()}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1 text-[11px] text-muted">
        less
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`heat-cell heat-cell--${l} w-[11px]`} />
        ))}
        more
      </div>
    </div>
  )
}

export default GitHeatmap
