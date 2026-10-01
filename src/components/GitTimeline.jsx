import { motion } from 'motion/react'

// Experience timeline styled as `git log --graph` (graph line: .git-graph in index.css).
function GitTimeline({ items }) {
  return (
    <div>
      <p className="mb-[26px] text-muted">
        <span className="text-green">$</span> git log --graph --oneline career
      </p>
      <ul className="git-graph relative m-0 list-none pl-7">
        {items.map((item, i) => (
          <motion.li
            key={item.hash}
            className="relative pb-9 pl-[14px]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
          >
            <span className="absolute top-[5px] -left-[27px] h-[14px] w-[14px] rounded-full border-2 border-green bg-bg shadow-(--glow-green)" />
            <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
              <span className="text-yellow">{item.hash}</span>
              {i === 0 && <span className="text-cyan">(HEAD -&gt; main)</span>}
              <span className="ml-auto text-muted">{item.period}</span>
            </div>
            <h3 className="mt-[6px] mb-2.5 text-[20px]">
              {item.role} <span className="text-cyan">@ {item.company}</span>
            </h3>
            <ul className="git-points m-0 pl-[18px] text-[14px] text-muted">
              {item.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default GitTimeline
