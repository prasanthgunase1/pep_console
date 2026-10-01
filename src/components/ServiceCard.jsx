import { techIcons } from '../lib/icons'

// "What I Do" card with a rotating conic-gradient border on hover (.svc-border in index.css).
function ServiceCard({ service, index }) {
  const Icon = techIcons[service.icon]

  return (
    <div className="svc-border group h-full rounded-(--radius) p-px">
      <article className="flex h-full flex-col rounded-[11px] bg-panel p-7 max-lap:p-6 max-xs:p-5">
        <div className="flex items-center justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-xl border border-line bg-panel-2 text-[28px] text-green [transition:transform_0.35s,box-shadow_0.35s,border-color_0.35s] group-hover:[transform:translateY(-4px)_rotate(-6deg)] group-hover:border-green group-hover:shadow-(--glow-green)">
            {Icon && <Icon />}
          </span>
          <span className="font-mono text-[13px] text-muted">0{index + 1}</span>
        </div>
        <h3 className="mt-6 text-[21px]">{service.title}</h3>
        <p className="mt-3 flex-1 text-[14px] text-muted">{service.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {service.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-[rgba(var(--cyan-rgb),0.06)] px-2.5 py-[3px] text-[12px] text-cyan"
            >
              {t}
            </span>
          ))}
        </div>
      </article>
    </div>
  )
}

export default ServiceCard
