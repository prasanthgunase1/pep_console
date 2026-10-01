import { techStack } from '../data'
import { techIcons } from '../lib/icons'

// Infinite scrolling strip of tech icons (pauses on hover).
function TechMarquee() {
  const items = [...techStack, ...techStack]
  return (
    <div
      className="group relative overflow-hidden border-y border-line py-[18px] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      aria-label="Tech stack"
    >
      <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-12 group-hover:[animation-play-state:paused]">
        {items.map((name, i) => {
          const Icon = techIcons[name]
          return (
            <span
              className="inline-flex items-center gap-2.5 text-[16px] whitespace-nowrap text-muted [transition:color_0.2s] hover:text-cyan [&_svg]:text-[22px]"
              key={`${name}-${i}`}
              aria-hidden={i >= techStack.length}
            >
              {Icon && <Icon />}
              {name}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default TechMarquee
