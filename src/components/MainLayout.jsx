import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Navbar from './Navbar'
import Footer from './Footer'
import MatrixRain from './MatrixRain'
import TargetCursor from './TargetCursor'
import ScrollProgress from './ScrollProgress'
import CommandPalette from './CommandPalette'
import PageTransition from './PageTransition'
import BackToTop from './BackToTop'

// Shell around every page: background effects, navbar, animated route outlet, footer.
function MainLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-300 focus:rounded-full focus:bg-green focus:px-4 focus:py-2 focus:font-mono focus:text-[13px] focus:text-bg"
      >
        Skip to content
      </a>
      <MatrixRain />
      <ScrollProgress />
      <Navbar />
      {/* min-h-screen keeps the footer from jumping while pages swap */}
      <main id="main" tabIndex={-1} className="min-h-screen outline-none">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
      <TargetCursor />
    </>
  )
}

export default MainLayout
