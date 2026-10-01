// ─────────────────────────────────────────────────────────────
//  Edit this file to personalise the whole portfolio.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Prasanth Gunasekaran',
  firstName: 'Prasanth',
  lastName: 'Gunasekaran',
  handle: 'prasanth',
  role: 'MERN Stack Developer',
  editor: 'VS Code',
  roles: ['Senior Engineer @ Tiger Analytics', 'MERN Stack Developer', 'React.js Developer', 'Node.js & REST API Developer'],
  tagline: 'I build scalable web apps with React, Node.js, Express and MongoDB — responsive UIs, clean REST APIs and efficient, maintainable code.',
  location: 'Chennai, India',
  email: 'prasanthgunasekaran03@gmail.com',
  resume: '/resume.pdf',
  photo: '', // e.g. '/me.jpg' (put the file in /public) — empty shows the animated avatar
  available: true,
  bio: [
    'Senior Engineer at Tiger Analytics with 4+ years of experience building scalable web applications using React.js, Node.js, Express.js and MongoDB — previously 3 years as a Software Developer at Factals Infotech Solutions, Chennai.',
    'I deliver end-to-end full-stack solutions across banking, pharma, insurance and e-commerce domains — responsive React UIs, RESTful APIs, optimized backends and AWS deployments (ECS, S3, Cognito SSO, Secrets Manager).',
    'Experienced in Agile environments and in collaborating with cross-functional teams for seamless project execution. BCA in Computer Science from SRM Institute of Science and Technology.',
  ],
}

// TODO(Prasanth): replace `yourname` with your real GitHub / LinkedIn handles
export const socials = [
  { label: 'GitHub', url: 'https://github.com/yourname', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/yourname', icon: 'linkedin' },
  { label: 'Email', url: 'mailto:prasanthgunasekaran03@gmail.com', icon: 'email' },
]

export const navLinks = [
  { label: 'home', path: '/' },
  { label: 'about', path: '/about' },
  { label: 'projects', path: '/projects' },
  { label: 'contact', path: '/contact' },
]

export const stats = [
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Companies', value: 2, suffix: '' },
  { label: 'Client Projects', value: 7, suffix: '+' },
  { label: 'Technologies', value: 20, suffix: '+' },
]

// Names must match keys in src/lib/icons.js to show an icon
export const techStack = [
  'React', 'Redux', 'JavaScript', 'Node.js', 'Express', 'REST APIs', 'MongoDB', 'Mongoose', 'PostgreSQL', 'Snowflake', 'AWS',
  'Tailwind', 'Material-UI', 'Bootstrap', 'SCSS', 'Git', 'GitHub', 'GitLab', 'Postman', 'Jira', 'VS Code',
]

// "What I Do" cards on the Home page. `icon` must match a key in src/lib/icons.js (techIcons)
export const services = [
  {
    icon: 'React',
    title: 'Frontend Development',
    description: 'Responsive, mobile-first React interfaces with clean state management and reusable components — built with Redux, Tailwind, Material-UI and SCSS.',
    tags: ['React', 'Redux', 'Tailwind', 'Material-UI', 'SCSS', 'Bootstrap'],
  },
  {
    icon: 'Node.js',
    title: 'Backend & REST APIs',
    description: 'Secure Express.js REST APIs with robust validation, efficient MongoDB data models and optimized backend performance.',
    tags: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Snowflake'],
  },
  {
    icon: 'AWS',
    title: 'Cloud & Delivery',
    description: 'Owning deployments and production releases on AWS — ECS tasks, S3, Cognito SSO and Secrets Manager — with code-quality checks and Agile collaboration.',
    tags: ['AWS ECS', 'S3', 'Cognito', 'Secrets Manager', 'Git', 'Jira'],
  },
]

// Skill bars on the About page (level = how confident you are, 0–100)
export const skills = [
  {
    group: 'frontend',
    items: [
      { name: 'react.js', level: 92 },
      { name: 'redux', level: 85 },
      { name: 'tailwind-css', level: 88 },
      { name: 'material-ui', level: 82 },
      { name: 'scss / bootstrap', level: 85 },
    ],
  },
  {
    group: 'backend',
    items: [
      { name: 'node.js', level: 88 },
      { name: 'express.js', level: 88 },
      { name: 'restful-apis', level: 90 },
      { name: 'javascript', level: 92 },
    ],
  },
  {
    group: 'database',
    items: [
      { name: 'mongodb', level: 85 },
      { name: 'mongoose', level: 85 },
      { name: 'postgresql', level: 78 },
      { name: 'snowflake', level: 72 },
    ],
  },
  {
    group: 'cloud',
    items: [
      { name: 'aws-ecs', level: 75 },
      { name: 'aws-s3', level: 80 },
      { name: 'cognito-sso', level: 72 },
      { name: 'secrets-manager', level: 72 },
    ],
  },
  {
    group: 'tools',
    items: [
      { name: 'git / github / gitlab', level: 88 },
      { name: 'postman', level: 85 },
      { name: 'jira (agile)', level: 82 },
      { name: 'vs-code', level: 92 },
    ],
  },
]

// Work history (newest first). `from` / `to` (YYYY-MM-DD, to: null = current) drive the
// live "Uptime" counter in the neofetch card — it adds up these periods, skipping gaps.
export const experience = [
  {
    hash: 'a1f9c3e',
    role: 'Senior Engineer',
    company: 'Tiger Analytics',
    location: 'Chennai',
    from: '2025-03-17',
    to: null,
    period: 'Mar 2025 — Present',
    points: [
      'Delivered end-to-end full-stack features for Associated Bank (ASB) with React.js, Node.js, Express.js, Snowflake, PostgreSQL and AWS.',
      'Managed deployments and production releases — ECS tasks, S3 integration and code-quality checks — plus defect fixes and production support.',
      'Built Merck OrQestra (pharma) from the ground up in React.js, integrating Amazon Cognito SSO, Secrets Manager and S3.',
      'Architected a Profile Generator that turns resumes into standardized profiles using LLM-based parsing, with a split-view React editor.',
    ],
  },
  {
    hash: '7b20d4f',
    role: 'Software Developer',
    company: 'Factals Infotech Solutions',
    location: 'Chennai',
    from: '2021-07-07',
    to: '2024-07-30',
    period: 'Jul 2021 — Jul 2024',
    points: [
      'Built responsive UIs and RESTful APIs with React.js, Node.js, Express.js and MongoDB.',
      'Delivered client projects across insurance, e-commerce and retail domains.',
      'Worked in Agile teams using Jira and Git/GitLab, collaborating closely with cross-functional teams.',
    ],
  },
]

export const education = [
  {
    hash: 'e5c2b18',
    degree: 'Bachelor of Computer Applications (BCA)',
    field: 'Computer Science',
    institute: 'SRM Institute of Science and Technology',
    university: 'SRM University',
    type: 'Full time',
    period: 'Jun 2018 — May 2021',
    gpa: '8.03',
  },
]

export const projectFilters = ['All', 'Full-stack', 'Frontend']

// Client / company projects. Leave `github` / `live` empty ('') when the code or site is private.
export const projects = [
  {
    slug: 'associated-bank',
    title: 'Associated Bank (ASB)',
    category: 'Full-stack',
    domain: 'Banking · Tiger Analytics',
    featured: true,
    accent: '#00e5ff',
    description: 'End-to-end full-stack features for a banking client — React.js frontend, Node.js / Express.js services, Snowflake & PostgreSQL data, deployed on AWS.',
    stack: ['React', 'Node.js', 'Express', 'Snowflake', 'PostgreSQL', 'AWS ECS', 'S3'],
    highlights: [
      'Independently handled both frontend and backend development for critical banking features',
      'Led feature development, defect fixes and production support for timely, high-quality releases',
      'Managed deployments — ECS tasks, S3 integration, code-quality checks and production releases',
      'Quickly ramped up on the banking domain and its data flows across Snowflake and PostgreSQL',
    ],
    github: '',
    live: '',
  },
  {
    slug: 'merck-orqestra',
    title: 'Merck OrQestra',
    category: 'Frontend',
    domain: 'Pharma · Tiger Analytics',
    featured: true,
    accent: '#ff2bd6',
    description: 'A pharma-domain application built from the ground up in React.js, secured with Amazon Cognito SSO and backed by AWS services.',
    stack: ['React', 'AWS Cognito', 'Secrets Manager', 'S3'],
    highlights: [
      'Contributed to building the application from the ground up using React.js',
      'Integrated Amazon Cognito single sign-on (SSO)',
      'Worked with AWS Secrets Manager and Amazon S3',
    ],
    github: '',
    live: '',
  },
  {
    slug: 'profile-generator',
    title: 'Profile Generator',
    category: 'Full-stack',
    domain: 'AI / HR Tech · Tiger Analytics',
    featured: true,
    accent: '#39ff14',
    description: 'Automatically transforms resumes into a standardized Tiger profile using LLM-based parsing, with a real-time split-view editor.',
    stack: ['React', 'Node.js', 'Express', 'REST APIs', 'LLM'],
    highlights: [
      'LLM-based parsing for accurate extraction of name, photo, summary, skills, education and projects',
      'Split-view React interface with inline editing to compare the original resume and the AI-generated profile in real time',
      'Secure Express.js REST APIs with robust validation',
      'Single- and multi-upload workflows with progress tracking — reducing manual profiling effort and improving consistency',
    ],
    github: '',
    live: '',
  },
  {
    slug: 'tawuniya-insurance',
    title: 'Tawuniya Insurance',
    category: 'Full-stack',
    domain: 'Insurance · Saudi Arabia',
    featured: false,
    accent: '#39ff14',
    description: 'A mobile-first insurance platform for Tawuniya (Saudi Arabia), built from scratch with React.js, Node.js and MongoDB.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    highlights: [
      'Built the mobile-first platform from scratch with robust frontend–backend integration',
      'Developed responsive, reusable UI components',
      'Implemented RESTful APIs and managed seamless data flow between client and server',
    ],
    github: '',
    live: '',
  },
  {
    slug: 'halal-saudi',
    title: 'Halal Saudi',
    category: 'Full-stack',
    domain: 'E-commerce / Retail',
    featured: false,
    accent: '#ff2bd6',
    description: 'An online marketplace for Halal-certified products, built with React.js, Node.js and MongoDB.',
    stack: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    highlights: [
      'Product search across the marketplace catalogue',
      'User authentication',
      'Shopping cart functionality',
    ],
    github: '',
    live: '',
  },
  {
    slug: 'ole-jewellery',
    title: 'OLE Jewellery Designer',
    category: 'Full-stack',
    domain: 'Retail / Fashion Tech',
    featured: false,
    accent: '#ffd60a',
    description: 'A custom jewellery design platform — resolved frontend and backend issues across the React.js and Node.js codebase.',
    stack: ['React', 'Node.js'],
    highlights: [
      'Fixed UI glitches across the customization flow',
      'Improved form validations',
      'Resolved functionality bugs in product customization and user interactions',
    ],
    github: '',
    live: '',
  },
  {
    slug: 'paper-wall',
    title: 'Paper Wall E-Commerce',
    category: 'Frontend',
    domain: 'E-commerce · Stealth Mode',
    featured: false,
    accent: '#00e5ff',
    description: 'A stealth-mode e-commerce website for paper wall products, built with HTML and CSS.',
    stack: ['HTML', 'CSS'],
    highlights: [
      'Fully responsive design for optimal viewing on mobile, tablet and desktop',
    ],
    github: '',
    live: '',
  },
]
