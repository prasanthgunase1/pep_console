export const THEME_EVENT = 'theme-change'
export const MODE_EVENT = 'mode-change'
const STORAGE_KEY = 'portfolio-theme'
const MODE_KEY = 'portfolio-mode'

// Accent themes. `light` holds darker variants that stay readable on a white background.
export const themes = {
  matrix: {
    primary: '#39ff14', primaryRgb: '57, 255, 20', secondary: '#00e5ff', secondaryRgb: '0, 229, 255',
    light: { primary: '#15803d', primaryRgb: '21, 128, 61', secondary: '#0e7490', secondaryRgb: '14, 116, 144' },
  },
  cyber: {
    primary: '#00e5ff', primaryRgb: '0, 229, 255', secondary: '#ff2bd6', secondaryRgb: '255, 43, 214',
    light: { primary: '#0e7490', primaryRgb: '14, 116, 144', secondary: '#be185d', secondaryRgb: '190, 24, 93' },
  },
  amber: {
    primary: '#ffb000', primaryRgb: '255, 176, 0', secondary: '#ff6b35', secondaryRgb: '255, 107, 53',
    light: { primary: '#b45309', primaryRgb: '180, 83, 9', secondary: '#c2410c', secondaryRgb: '194, 65, 12' },
  },
  synth: {
    primary: '#ff2bd6', primaryRgb: '255, 43, 214', secondary: '#8b5cf6', secondaryRgb: '139, 92, 246',
    light: { primary: '#be185d', primaryRgb: '190, 24, 93', secondary: '#6d28d9', secondaryRgb: '109, 40, 217' },
  },
}

export const modes = ['dark', 'light']

const read = (key, valid, fallback) => {
  try {
    const saved = localStorage.getItem(key)
    return valid(saved) ? saved : fallback
  } catch {
    return fallback
  }
}

const save = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage unavailable */
  }
}

export const getTheme = () => read(STORAGE_KEY, (v) => Boolean(themes[v]), 'matrix')

export const getMode = () => read(MODE_KEY, (v) => modes.includes(v), 'dark')

export const applyTheme = (name) => {
  const theme = themes[name]
  if (!theme) return false
  const colors = themeColors(theme)
  const root = document.documentElement.style
  root.setProperty('--green', colors.primary)
  root.setProperty('--green-rgb', colors.primaryRgb)
  root.setProperty('--cyan', colors.secondary)
  root.setProperty('--cyan-rgb', colors.secondaryRgb)
  save(STORAGE_KEY, name)
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: name }))
  return true
}

// Dark / light mode: swaps the base palette (index.css [data-mode='light']) and re-applies the accent theme.
export const applyMode = (mode) => {
  if (!modes.includes(mode)) return false
  document.documentElement.dataset.mode = mode
  // mobile browser bar color follows the page background
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'light' ? '#f5f7fa' : '#05070a')
  save(MODE_KEY, mode)
  applyTheme(getTheme())
  window.dispatchEvent(new CustomEvent(MODE_EVENT, { detail: mode }))
  return true
}

// accent colors for the current mode (light mode uses the darker variants)
export const themeColors = (theme, mode = getMode()) => (mode === 'light' ? theme.light : theme)

export const toggleMode = () => applyMode(getMode() === 'light' ? 'dark' : 'light')

export const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export const PALETTE_EVENT = 'open-command-palette'

export const openCommandPalette = () => window.dispatchEvent(new Event(PALETTE_EVENT))
