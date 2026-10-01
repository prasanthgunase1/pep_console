import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import GlitchText from '../components/GlitchText'
import MagneticButton from '../components/MagneticButton'
import { usePageTitle } from '../lib/hooks'

function NotFoundPage() {
  usePageTitle('404')
  const { pathname } = useLocation()

  return (
    <div className="page grid place-items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlitchText as="h1" text="404" className="text-[clamp(110px,22vw,220px)] font-bold text-green [text-shadow:var(--glow-green)]" />
        <p className="mt-[6px] text-[16px] break-all">
          <span className="text-magenta">bash:</span> {pathname}: command not found
        </p>
        <p className="mt-2.5 mb-[34px] text-muted">The page you are looking for was moved, deleted, or never existed.</p>
        <MagneticButton>
          <Link to="/" className="btn">
            cd ~
          </Link>
        </MagneticButton>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
