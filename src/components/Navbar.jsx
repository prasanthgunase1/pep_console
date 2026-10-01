import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { FaBars, FaMoon, FaSun, FaXmark, FaTerminal } from 'react-icons/fa6'
import { navLinks, profile } from '../data'
import { getMode, MODE_EVENT, openCommandPalette, toggleMode } from '../lib/theme'

const linkBase = 'relative text-[14px] [transition:color_0.2s] hover:text-fg'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mode, setMode] = useState(getMode)
  const { scrollY } = useScroll()

  useEffect(() => {
    const onMode = (e) => setMode(e.detail)
    window.addEventListener(MODE_EVENT, onMode)
    return () => window.removeEventListener(MODE_EVENT, onMode)
  }, [])

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30))

  const renderLinks = (mobile) =>
    navLinks.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        end={link.path === '/'}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? 'text-fg' : 'text-muted'} ${
            mobile ? 'border-b border-dashed border-line px-1 py-[14px]' : 'px-3 py-[6px]'
          }`
        }
        onClick={() => setOpen(false)}
      >
        {({ isActive }) => (
          <>
            <span className="text-green">~/</span>
            {link.label}
            {isActive && !mobile && (
              <motion.span
                layoutId="nav-underline"
                className="absolute right-3 bottom-0 left-3 h-[2px] bg-green shadow-(--glow-green)"
              />
            )}
          </>
        )}
      </NavLink>
    ))

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-100 border-b [transition:background_0.3s,border-color_0.3s,backdrop-filter_0.3s] ${
        scrolled ? 'border-line bg-[rgba(var(--bg-rgb),0.75)] backdrop-blur-[12px]' : 'border-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-(--max-w) items-center justify-between gap-5 px-6 py-[18px] max-nav:px-4 max-nav:py-[14px]">
        <NavLink to="/" className="text-[17px] font-bold tracking-[0.02em]">
          <span className="text-cyan">&lt;</span>
          {profile.handle}
          <span className="text-cyan"> /&gt;</span>
        </NavLink>

        <nav className="flex gap-2 max-nav:hidden">{renderLinks(false)}</nav>

        <div className="flex items-center gap-2.5">
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-[6px] text-[12px] text-muted [transition:border-color_0.2s,color_0.2s] hover:border-green hover:text-green"
            onClick={openCommandPalette}
            aria-label="Open command palette"
          >
            <FaTerminal /> <kbd className="font-mono max-nav:hidden">Ctrl K</kbd>
          </button>
          <button
            className="relative grid h-[30px] w-[34px] place-items-center overflow-hidden rounded-lg border border-line bg-panel text-[14px] text-muted [transition:border-color_0.2s,color_0.2s] hover:border-green hover:text-green"
            onClick={toggleMode}
            aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            data-cursor-label={mode === 'light' ? 'dark' : 'light'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mode}
                className="leading-[0]"
                initial={{ y: 14, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -14, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.25 }}
              >
                {mode === 'light' ? <FaMoon /> : <FaSun />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            className="hidden rounded-lg border border-line bg-transparent px-[9px] py-[7px] text-[16px] leading-[0] max-nav:inline-block"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="hidden flex-col overflow-hidden border-b border-line bg-[rgba(var(--bg-rgb),0.95)] px-4 max-nav:flex"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderLinks(true)}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
