# Project instructions

## 1. No testing or building
- Never run tests (`npm test`, `vitest`, etc.) or build the app (`npm run build`, `vite build`, `tsc`), for any change, unless I explicitly ask for it.

## 2. Change only what I ask for
- When I ask for a UI change, change only that UI. Keep the existing functionality exactly as it is.
- Do not touch any file, component, logic, style, or code that I did not mention in the chat. No extra refactors, renames, cleanups, or "improvements".

## 3. No git operations
- Never run `git add`, `git commit`, or `git push` to GitLab (or any remote). I handle all git operations myself.

---

# Project guide

Personal portfolio of **Prasanth Gunasekaran** (MERN Stack Developer). It's a dark cyber/terminal-style site with heavy animation, a light ("white") mode and four accent color themes.

## Stack
- **React 19** + **Vite 8**: `npm run dev` / `npm run build` / `npm run lint`
- **Tailwind CSS v4** via `@tailwindcss/vite`. It's CSS-first: there is no `tailwind.config.js`, and tokens live in `src/index.css`.
- **motion** (Framer Motion), imported from `motion/react`, for every animation.
- **react-router-dom 7** for routing. `BrowserRouter` is in `main.jsx`.
- **react-icons** (`si` brand icons, `fa6` UI icons)
- **Redux Toolkit / RTK Query** is wired up (`app/store.js`, `services/api.js`) but unused by the UI so far.
- There is no test framework. `npm run lint` (ESLint) is the only automated check.

## Folder structure
```
src/
  main.jsx          entry (Provider + BrowserRouter) — leave as is
  App.jsx           routes + BootLoader; applies saved dark/light mode + theme on load
  index.css         Tailwind import, design tokens, light-mode overrides, custom effects, keyframes
  data.js           ALL portfolio content (profile, socials, skills, experience, projects, services)
  lib/
    hooks.js        useTypewriter, useMousePosition, useReducedMotion, isTouchDevice, useKeyPress,
                    useBootDone / BOOT_EVENT / BOOT_KEY, usePageTitle
    theme.js        accent themes + dark/light mode (applyTheme, applyMode, toggleMode, events)
    icons.js        techIcons (tech name → icon) and socialIcons
  components/       one component per file, default export (Navbar.jsx, TargetCursor.jsx, …)
  pages/            Home, About, Projects, ProjectDetail, Contact, NotFound (one per route)
  app/ services/    Redux store + RTK Query base API (untouched)
public/             favicon.svg (PG icon); put resume.pdf / photo here
```

## Routes
`/` Home · `/about` · `/projects` · `/projects/:slug` · `/contact` · `*` → 404.
All routes render inside `components/MainLayout.jsx`, which adds the background effects, navbar, animated page transitions, footer, back-to-top button, Ctrl+K palette and cursor.

## Editing content
- Change text, links, skills, jobs, projects and services **only in `src/data.js`**.
- Each tech name in `techStack` / `services[].icon` must match a key in `lib/icons.js`.
- `profile.photo` set to e.g. `'/me.jpg'` (file in `public/`) shows a real photo instead of the animated avatar.
- `profile.careerStart` drives the live "uptime" counter in the neofetch card.

## Styling conventions
- Use **Tailwind utilities in JSX** for layout, spacing, type, color and hover.
- Use custom CSS in `index.css` (`@layer components`) only for things utilities can't express: keyframes, `::before/::after`, SVG animation, complex gradients. Label each block `/* === Name === */`.
- Color utilities map to runtime CSS vars: `bg-bg`, `bg-panel`, `bg-panel-2`, `border-line`, `text-fg`, `text-muted`, `text-green` (primary accent), `text-cyan` (secondary), `text-magenta`, `text-yellow`.
- Never hardcode dark colors. Use the mode variables instead, so light mode keeps working: `--bg-rgb`, `--panel-rgb`, `--heading`, `--text-soft`, `--faint`, `--scrim`, `--shadow-deep`.
- Breakpoints (max-width style): `max-phone:` 600px, `max-nav:` 760px, `max-tab:` 900px.
- Shared classes: `.page`, `.section`, `.grid-3`, `.btn`, `.btn--cyan`, `.blink-cursor`.

## Themes & modes
- **Accent themes**: matrix, cyber, amber and synth. They're set from the footer dots or `theme <name>` in Ctrl+K. Each theme has a darker `light` variant for white mode.
- **Dark / light mode**: set from the navbar sun/moon button, or `mode dark|light` in Ctrl+K. It sets `html[data-mode]`, and `index.css` swaps the base palette under `:root[data-mode='light']`.
- Both are saved in localStorage (`portfolio-theme`, `portfolio-mode`). Changes fire `THEME_EVENT` / `MODE_EVENT`.

## Notable behavior
- **BootLoader** plays once per browser session (`sessionStorage`). Home hero animations wait for `useBootDone()`.
- **Reduced motion**: the OS "reduce motion" setting disables the canvas, cursor and glitch effects.
- **Dev server**: `vite.config.js` pins `server.host` and `hmr.host` to `127.0.0.1`. This fixes the HMR WebSocket failing when Vite bound only to IPv6.
