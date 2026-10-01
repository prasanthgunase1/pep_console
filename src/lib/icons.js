import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiMongoose, SiRedux, SiTypescript, SiJavascript, SiNextdotjs,
  SiGraphql, SiPostgresql, SiRedis, SiDocker, SiSocketdotio, SiTailwindcss, SiJest, SiGit, SiGithub, SiGitlab,
  SiSass, SiBootstrap, SiMui, SiPostman, SiJira, SiHtml5, SiCss, SiSnowflake,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { TbApi } from 'react-icons/tb'
import { FaAws, FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa6'

// tech name (as written in data.js) → icon
export const techIcons = {
  React: SiReact,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Mongoose: SiMongoose,
  Redux: SiRedux,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Next.js': SiNextdotjs,
  GraphQL: SiGraphql,
  PostgreSQL: SiPostgresql,
  Snowflake: SiSnowflake,
  AWS: FaAws,
  Redis: SiRedis,
  Docker: SiDocker,
  'Socket.io': SiSocketdotio,
  Tailwind: SiTailwindcss,
  'Material-UI': SiMui,
  Bootstrap: SiBootstrap,
  SCSS: SiSass,
  HTML: SiHtml5,
  CSS: SiCss,
  'REST APIs': TbApi,
  Jest: SiJest,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Postman: SiPostman,
  Jira: SiJira,
  'VS Code': VscVscode,
}

export const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: FaEnvelope,
}
