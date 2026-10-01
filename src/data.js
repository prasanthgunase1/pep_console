// ─────────────────────────────────────────────────────────────
//  Edit this file to personalise the whole portfolio.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Prasanth Gunasekaran',
  firstName: 'Prasanth',
  lastName: 'Gunasekaran',
  handle: 'prasanth',
  role: 'MERN Stack Developer',
  careerStart: '2022-06-01', // drives the live "uptime" counter
  editor: 'VS Code',
  roles: ['MERN Stack Developer', 'React Engineer', 'Node.js API Architect', 'Full-Stack Problem Solver'],
  tagline: 'I build fast, scalable web apps — from MongoDB schemas to pixel-perfect React UIs.',
  location: 'Chennai, India',
  email: 'you@example.com',
  resume: '/resume.pdf',
  photo: '', // e.g. '/me.jpg' (put the file in /public) — empty shows the animated avatar
  available: true,
  bio: [
    'Full-stack developer with 4+ years of experience shipping production apps with MongoDB, Express, React and Node.js.',
    'I love designing clean REST & GraphQL APIs, crafting smooth interfaces with motion, and turning messy requirements into maintainable code.',
    'Outside of work I tinker with dev tooling, contribute to open source and write about JavaScript performance.',
  ],
}

export const socials = [
  { label: 'GitHub', url: 'https://github.com/yourname', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/yourname', icon: 'linkedin' },
  { label: 'X', url: 'https://x.com/yourname', icon: 'x' },
  { label: 'Email', url: 'mailto:you@example.com', icon: 'email' },
]

export const navLinks = [
  { label: 'home', path: '/' },
  { label: 'about', path: '/about' },
  { label: 'projects', path: '/projects' },
  { label: 'contact', path: '/contact' },
]

export const stats = [
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Projects Shipped', value: 30, suffix: '+' },
  { label: 'Happy Clients', value: 15, suffix: '' },
  { label: 'Commits / Year', value: 1200, suffix: '+' },
]

// Names must match keys in src/lib/icons.js to show an icon
export const techStack = [
  'React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'TypeScript', 'JavaScript',
  'Next.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker', 'Socket.io', 'Tailwind', 'Jest', 'Git',
]

// "What I Do" cards on the Home page. `icon` must match a key in src/lib/icons.js (techIcons)
export const services = [
  {
    icon: 'React',
    title: 'Frontend Engineering',
    description: 'Fast, accessible React apps with clean state management, smooth motion and pixel-perfect, responsive UI.',
    tags: ['React', 'Redux Toolkit', 'Next.js', 'Tailwind', 'Motion'],
  },
  {
    icon: 'Node.js',
    title: 'Backend & APIs',
    description: 'Secure, scalable REST & GraphQL APIs with Node and Express — auth, caching, real-time and solid data models.',
    tags: ['Node.js', 'Express', 'MongoDB', 'GraphQL', 'Socket.io'],
  },
  {
    icon: 'Docker',
    title: 'DevOps & Delivery',
    description: 'Containerised services, CI/CD pipelines and cloud deploys so features ship quickly and reliably.',
    tags: ['Docker', 'GitHub Actions', 'AWS', 'Jest', 'Nginx'],
  },
]

export const skills = [
  {
    group: 'frontend',
    items: [
      { name: 'react', level: 95 },
      { name: 'redux-toolkit', level: 90 },
      { name: 'next.js', level: 80 },
      { name: 'typescript', level: 85 },
    ],
  },
  {
    group: 'backend',
    items: [
      { name: 'node.js', level: 92 },
      { name: 'express', level: 92 },
      { name: 'graphql', level: 75 },
      { name: 'socket.io', level: 78 },
    ],
  },
  {
    group: 'database',
    items: [
      { name: 'mongodb', level: 90 },
      { name: 'mongoose', level: 90 },
      { name: 'postgresql', level: 70 },
      { name: 'redis', level: 72 },
    ],
  },
  {
    group: 'devops',
    items: [
      { name: 'docker', level: 75 },
      { name: 'aws', level: 70 },
      { name: 'ci-cd', level: 78 },
      { name: 'jest', level: 80 },
    ],
  },
]

export const experience = [
  {
    hash: 'a1f9c3e',
    role: 'Senior MERN Developer',
    company: 'Company One',
    period: '2025 — Present',
    points: [
      'Lead a team of 4 building a multi-tenant SaaS dashboard in React + Node.',
      'Cut API latency by 45% with Redis caching and MongoDB index tuning.',
      'Introduced RTK Query & a component library adopted across 3 products.',
    ],
  },
  {
    hash: '7b20d4f',
    role: 'Full-Stack Developer',
    company: 'Company Two',
    period: '2023 — 2025',
    points: [
      'Built real-time chat & notifications with Socket.io for 50k+ users.',
      'Designed REST APIs with JWT auth, role-based access and rate limiting.',
      'Dockerised services and set up GitHub Actions CI/CD pipelines.',
    ],
  },
  {
    hash: '3c8e11a',
    role: 'Junior Web Developer',
    company: 'Company Three',
    period: '2022 — 2023',
    points: [
      'Developed responsive React UIs from Figma designs.',
      'Wrote Express endpoints and Mongoose models for e-commerce features.',
    ],
  },
]

export const projectFilters = ['All', 'React', 'Node', 'Full-stack']

export const projects = [
  {
    slug: 'shopsphere',
    title: 'ShopSphere',
    category: 'Full-stack',
    featured: true,
    accent: '#39ff14',
    description: 'A full-featured e-commerce platform with cart, payments, admin panel and analytics.',
    stack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    highlights: [
      'Stripe checkout with webhooks and order lifecycle tracking',
      'Admin dashboard with sales charts and inventory management',
      'Server-side pagination & full-text search across 10k+ products',
    ],
    github: 'https://github.com/yourname/shopsphere',
    live: 'https://example.com',
  },
  {
    slug: 'devchat',
    title: 'DevChat',
    category: 'Full-stack',
    featured: true,
    accent: '#00e5ff',
    description: 'Real-time chat app for developer teams with rooms, code snippets and presence.',
    stack: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
    highlights: [
      'WebSocket rooms with typing indicators and read receipts',
      'Syntax-highlighted code snippets inside messages',
      'Horizontal scaling with the Redis pub/sub adapter',
    ],
    github: 'https://github.com/yourname/devchat',
    live: 'https://example.com',
  },
  {
    slug: 'taskflow',
    title: 'TaskFlow',
    category: 'React',
    featured: true,
    accent: '#ff2bd6',
    description: 'Kanban-style project manager with drag & drop, filters and offline support.',
    stack: ['React', 'Redux Toolkit', 'Motion', 'IndexedDB'],
    highlights: [
      'Smooth drag & drop between boards with optimistic updates',
      'Offline-first with background sync',
      'Keyboard shortcuts & command palette',
    ],
    github: 'https://github.com/yourname/taskflow',
    live: 'https://example.com',
  },
  {
    slug: 'authforge',
    title: 'AuthForge API',
    category: 'Node',
    featured: false,
    accent: '#ffd60a',
    description: 'Plug-and-play authentication microservice with JWT, OAuth and 2FA.',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Docker'],
    highlights: [
      'Access/refresh token rotation with reuse detection',
      'Google & GitHub OAuth, TOTP-based 2FA',
      'OpenAPI docs and 95% test coverage with Jest',
    ],
    github: 'https://github.com/yourname/authforge',
    live: '',
  },
  {
    slug: 'medibook',
    title: 'MediBook',
    category: 'Full-stack',
    featured: false,
    accent: '#39ff14',
    description: 'Doctor appointment booking system with schedules, reminders and video calls.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'WebRTC'],
    highlights: [
      'Slot-based scheduling with timezone handling',
      'Email/SMS reminders using background job queues',
      'In-browser video consultations via WebRTC',
    ],
    github: 'https://github.com/yourname/medibook',
    live: 'https://example.com',
  },
  {
    slug: 'logpulse',
    title: 'LogPulse',
    category: 'Node',
    featured: false,
    accent: '#00e5ff',
    description: 'Lightweight log aggregation & alerting service for Node.js microservices.',
    stack: ['Node.js', 'Streams', 'MongoDB', 'GraphQL'],
    highlights: [
      'Ingests 5k logs/sec using Node streams and batching',
      'GraphQL API with live subscriptions for dashboards',
      'Slack alerts on custom threshold rules',
    ],
    github: 'https://github.com/yourname/logpulse',
    live: '',
  },
]
