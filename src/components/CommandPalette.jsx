import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useKeyPress } from '../lib/hooks'
import { PALETTE_EVENT, applyTheme, themes } from '../lib/theme'
import { navLinks, profile, projects, skills, socials } from '../data'

const WELCOME = [
  { type: 'out', text: `Welcome to ${profile.handle}-shell v4.0 — type "help" to get started.` },
]

const HELP = [
  'Available commands:',
  '  home | about | projects | contact   navigate to a page',
  '  ls                                  list projects',
  '  open <project>                      open a project page',
  '  whoami                              who am I?',
  '  skills                              print my stack',
  '  socials                             find me online',
  '  resume                              download my resume',
  '  theme <matrix|cyber|amber|synth>    change the color scheme',
  '  sudo hire-me                        ;)',
  '  clear | exit                        clear screen / close',
]

// Ctrl/Cmd+K terminal: type commands to navigate, change theme, etc.
function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState(WELCOME)
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const navigate = useNavigate()

  useKeyPress('mod+k', (e) => {
    e.preventDefault()
    setOpen((o) => !o)
  })
  useKeyPress('escape', () => setOpen(false))

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(PALETTE_EVENT, onOpen)
    return () => window.removeEventListener(PALETTE_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  const print = (...texts) => texts.map((text) => ({ type: 'out', text }))

  const go = (path, msg) => {
    navigate(path)
    setTimeout(() => setOpen(false), 350)
    return print(msg)
  }

  const run = (raw) => {
    const cmd = raw.trim()
    const [name, ...args] = cmd.toLowerCase().split(/\s+/)
    const page = navLinks.find((l) => l.label === name)

    if (!cmd) return []
    if (page) return go(page.path, `→ navigating to ~${page.path === '/' ? '' : page.path}`)

    switch (name) {
      case 'help':
        return print(...HELP)
      case 'ls':
        return print(...projects.map((p) => `  ${p.slug.padEnd(14)} ${p.title} — ${p.category}`))
      case 'open':
      case 'cd': {
        const target = args[0]?.replace(/^~?\/?(projects\/)?/, '')
        const project = projects.find((p) => p.slug === target)
        if (project) return go(`/projects/${project.slug}`, `→ opening ${project.title}`)
        return print(`project not found: ${args[0] ?? ''}. try "ls"`)
      }
      case 'whoami':
        return print(`${profile.name} — ${profile.role}`, profile.tagline)
      case 'skills':
        return print(...skills.map((g) => `  ${g.group.padEnd(10)} ${g.items.map((i) => i.name).join(', ')}`))
      case 'socials':
        return print(...socials.map((s) => `  ${s.label.padEnd(10)} ${s.url}`))
      case 'resume':
        window.open(profile.resume, '_blank')
        return print('→ opening resume…')
      case 'theme':
        if (!args[0]) return print(`themes: ${Object.keys(themes).join(', ')}`)
        return applyTheme(args[0])
          ? print(`✔ theme set to "${args[0]}"`)
          : print(`unknown theme: ${args[0]}. try: ${Object.keys(themes).join(', ')}`)
      case 'sudo':
        if (args.join(' ') === 'hire-me') {
          return go('/contact', '[sudo] access granted ✔ — redirecting to contact…')
        }
        return print('sudo: permission denied. nice try 😏')
      case 'clear':
        setLines([])
        return null
      case 'exit':
        setOpen(false)
        return []
      default:
        return print(`command not found: ${name}. type "help"`)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const output = run(input)
    if (output !== null) {
      setLines((prev) => [...prev, { type: 'in', text: input }, ...output])
    }
    if (input.trim()) setHistory((h) => [input, ...h])
    setHistIdx(-1)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      setHistIdx(next)
      setInput(next >= 0 ? history[next] : '')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-500 flex items-start justify-center bg-[rgba(0,0,0,0.6)] px-4 pt-[14vh] pb-4 backdrop-blur-[4px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="w-full max-w-[680px] overflow-hidden rounded-(--radius) border border-green bg-[rgba(8,12,17,0.97)] shadow-[0_0_0_1px_rgba(var(--green-rgb),0.2),0_0_60px_rgba(var(--green-rgb),0.18)]"
            initial={{ opacity: 0, scale: 0.92, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.focus()
            }}
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-[14px] py-2.5">
              <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
              <span className="flex-1 text-center text-[12px] text-muted">{profile.handle}@portfolio: ~</span>
              <kbd className="rounded-[4px] border border-line px-[6px] py-[2px] font-mono text-[11px] text-muted">esc</kbd>
            </div>
            <div className="max-h-[55vh] overflow-y-auto px-[18px] py-4 text-[13.5px]" ref={bodyRef}>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap [word-break:break-word] ${line.type === 'in' ? 'mt-2' : 'text-muted'}`}
                >
                  {line.type === 'in' && <span className="text-green">❯ </span>}
                  {line.text}
                </div>
              ))}
              <form onSubmit={onSubmit} className="mt-2 flex gap-2.5">
                <span className="text-green">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck="false"
                  autoComplete="off"
                  aria-label="Command"
                  placeholder="type a command…"
                  className="flex-1 border-none bg-transparent text-fg caret-green outline-none placeholder:text-[#3b4652]"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
