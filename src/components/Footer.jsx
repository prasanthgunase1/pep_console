import { useEffect, useState } from 'react'
import { profile, socials } from '../data'
import { socialIcons } from '../lib/icons'
import { applyTheme, getTheme, THEME_EVENT, themes } from '../lib/theme'

// Socials, theme switcher dots and a live clock.
function Footer() {
  const [time, setTime] = useState(() => new Date())
  const [theme, setTheme] = useState(getTheme)

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onTheme = (e) => setTheme(e.detail)
    window.addEventListener(THEME_EVENT, onTheme)
    return () => window.removeEventListener(THEME_EVENT, onTheme)
  }, [])

  return (
    <footer className="relative z-1 border-t border-line bg-[rgba(var(--bg-rgb),0.85)]">
      <div className="mx-auto flex max-w-(--max-w) flex-wrap items-center justify-between gap-4 px-6 py-7 text-[13px] text-muted max-phone:flex-col max-phone:px-4 max-phone:py-6 max-phone:text-center">
        <div className="flex gap-[14px]">
          {socials.map((s) => {
            const Icon = socialIcons[s.icon]
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-[16px] [transition:color_0.2s,border-color_0.2s,transform_0.2s] hover:border-green hover:text-green hover:[transform:translateY(-3px)]"
              >
                {Icon && <Icon />}
              </a>
            )
          })}
        </div>
        <p>
          <span className="text-green">©</span> {new Date().getFullYear()} {profile.name} — built with React + Motion
        </p>
        <div className="flex gap-2.5" role="radiogroup" aria-label="Color theme">
          {Object.entries(themes).map(([name, t]) => (
            <button
              key={name}
              role="radio"
              aria-checked={theme === name}
              aria-label={`${name} theme`}
              data-cursor-label={name}
              className={`h-[18px] w-[18px] rounded-full border-2 border-bg bg-[linear-gradient(135deg,var(--swatch)_50%,var(--swatch-2)_50%)] p-0 [transition:transform_0.2s,box-shadow_0.2s] hover:[transform:scale(1.2)] ${
                theme === name
                  ? 'shadow-[0_0_0_2px_var(--swatch),0_0_10px_var(--swatch)]'
                  : 'shadow-[0_0_0_1px_var(--border)]'
              }`}
              style={{ '--swatch': t.primary, '--swatch-2': t.secondary }}
              onClick={() => applyTheme(name)}
            />
          ))}
        </div>
        <p className="flex items-center gap-2">
          <span className="h-2 w-2 animate-[blink_1.6s_infinite] rounded-full bg-green shadow-(--glow-green)" />{' '}
          {time.toLocaleTimeString()} · {profile.location}
        </p>
      </div>
    </footer>
  )
}

export default Footer
