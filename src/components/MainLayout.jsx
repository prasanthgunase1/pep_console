import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Navbar from './Navbar'
import Footer from './Footer'
import MatrixRain from './MatrixRain'
import TargetCursor from './TargetCursor'
import ScrollProgress from './ScrollProgress'
import CommandPalette from './CommandPalette'
import PageTransition from './PageTransition'

// Shell around every page: background effects, navbar, animated route outlet, footer.
function MainLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <>
      <MatrixRain />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <PageTransition key={location.pathname}>{outlet}</PageTransition>
      </AnimatePresence>
      <Footer />
      <CommandPalette />
      <TargetCursor />
    </>
  )
}

export default MainLayout
