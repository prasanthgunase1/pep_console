export const THEME_EVENT = 'theme-change'
const STORAGE_KEY = 'portfolio-theme'

export const themes = {
  matrix: { primary: '#39ff14', primaryRgb: '57, 255, 20', secondary: '#00e5ff', secondaryRgb: '0, 229, 255' },
  cyber: { primary: '#00e5ff', primaryRgb: '0, 229, 255', secondary: '#ff2bd6', secondaryRgb: '255, 43, 214' },
  amber: { primary: '#ffb000', primaryRgb: '255, 176, 0', secondary: '#ff6b35', secondaryRgb: '255, 107, 53' },
  synth: { primary: '#ff2bd6', primaryRgb: '255, 43, 214', secondary: '#8b5cf6', secondaryRgb: '139, 92, 246' },
}

export const getTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return themes[saved] ? saved : 'matrix'
  } catch {
    return 'matrix'
  }
}

export const applyTheme = (name) => {
  const theme = themes[name]
  if (!theme) return false
  const root = document.documentElement.style
  root.setProperty('--green', theme.primary)
  root.setProperty('--green-rgb', theme.primaryRgb)
  root.setProperty('--cyan', theme.secondary)
  root.setProperty('--cyan-rgb', theme.secondaryRgb)
  try {
    localStorage.setItem(STORAGE_KEY, name)
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: name }))
  return true
}

export const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export const PALETTE_EVENT = 'open-command-palette'

export const openCommandPalette = () => window.dispatchEvent(new Event(PALETTE_EVENT))
