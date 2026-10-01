import { Route, Routes } from 'react-router-dom'
import BootLoader from './components/BootLoader'
import MainLayout from './components/MainLayout'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ProjectsPage from './pages/Projects'
import ProjectDetailPage from './pages/ProjectDetail'
import ContactPage from './pages/Contact'
import NotFoundPage from './pages/NotFound'
import { applyMode, getMode } from './lib/theme'

applyMode(getMode()) // dark/light + accent theme

function App() {
  return (
    <>
      <BootLoader />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
