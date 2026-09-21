import { Navigate, Route, Routes } from 'react-router-dom'
import LanguageLayout from './components/LanguageLayout.jsx'
import LegacyProjectRedirect from './components/LegacyProjectRedirect.jsx'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
      <Route path="/:lang" element={<LanguageLayout />}>
        <Route index element={<Home />} />
        <Route path="work/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
