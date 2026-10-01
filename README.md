# Prasanth Gunasekaran — Portfolio

A personal portfolio for a MERN stack developer. It has a dark cyber/terminal design with a light (white) mode, four accent color themes and a lot of animation, and works on screens from 320px phones to 4K monitors.

## Tech stack

| Tool | Purpose |
| --- | --- |
| [React 19](https://react.dev/) | UI library |
| [Vite 8](https://vite.dev/) | Dev server and build tool |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling, via `@tailwindcss/vite`. There is no config file; tokens live in `src/index.css` |
| [Motion](https://motion.dev/) | All animations (`import … from 'motion/react'`) |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [react-icons](https://react-icons.github.io/react-icons/) | Brand and UI icons |
| [Redux Toolkit + RTK Query](https://redux-toolkit.js.org/) | Store and API layer, wired up for future backend data |
| [ESLint](https://eslint.org/) | Linting |

## Getting started

```bash
npm install
npm run dev      # http://127.0.0.1:5173
```

The dev server is pinned to `127.0.0.1` in `vite.config.js`. This keeps the hot-reload WebSocket working on machines where Vite would otherwise bind only to IPv6.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Editing your content

All text and links live in **`src/data.js`**: profile, socials, stats, skills, experience, projects and the "What I Do" services. Edit that file only.

- Put `resume.pdf` in `public/`. The resume button and the `resume` terminal command link to it.
- To use a real photo instead of the animated avatar, put the image in `public/` and set `photo: '/me.jpg'`.
- The neofetch "Uptime" adds up the `from` / `to` dates in `experience` (gaps between jobs are skipped).
- **Contact form (EmailJS):** copy `.env.example` to `.env.local`, fill in your EmailJS service, template and public key, then restart `npm run dev`. Without keys the form opens the visitor's mail app instead.

## Folder structure

```
potfo/
├── public/                favicon.svg (+ resume.pdf, photo)
├── src/
│   ├── main.jsx           Entry: Redux Provider + BrowserRouter
│   ├── App.jsx            Routes + boot screen; applies the saved dark/light mode and theme
│   ├── index.css          Tailwind import, design tokens, light mode, breakpoints, custom effects
│   ├── data.js            All portfolio content
│   ├── lib/
│   │   ├── hooks.js       Custom hooks (typewriter, boot state, page title, mode, key press…)
│   │   ├── theme.js       Accent themes + dark/light mode
│   │   └── icons.js       Tech and social icon maps
│   ├── components/        One component per file (Navbar, TargetCursor, SkillSphere, …)
│   ├── pages/             Home, About, Projects, ProjectDetail, Contact, NotFound
│   ├── app/store.js       Redux store
│   └── services/api.js    Base RTK Query API
├── index.html
├── vite.config.js
└── package.json
```

Conventions (styling, breakpoints, themes) are documented in [CLAUDE.md](CLAUDE.md).

## Features

- **Ctrl / Cmd + K terminal.** Commands: `help`, `about`, `projects`, `open <project>`, `theme <matrix|cyber|amber|synth>`, `mode <dark|light>`, `sudo hire-me`, and more.
- **Dark / light mode** via the navbar button. **Accent themes** via the footer dots. Both are saved in localStorage.
- **Animations:**
  - boot screen, page-wipe transitions and matrix rain background;
  - a target-lock cursor and a decrypting/glitching name;
  - 3D tilt project cards, a 3D skill globe, the neofetch card, the git timeline and the contribution heatmap.
- **Accessibility:** a skip link, per-page titles, and respect for the OS "reduce motion" setting.

## Environment variables

`.env` in the project root. Vite only exposes variables whose names start with `VITE_`.

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL of the backend API that RTK Query calls |

## Adding backend data later (RTK Query)

Inject endpoints into the shared base API rather than creating a new `createApi`:

```js
// src/services/projectsApi.js
import { api } from './api'

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({ query: () => '/projects' }),
  }),
})

export const { useGetProjectsQuery } = projectsApi
```
