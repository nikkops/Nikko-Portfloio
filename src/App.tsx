import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './screens/About'
import Contact from './screens/Contact'
import Leadership from './screens/Leadership'
import Menu from './screens/Menu'
import NotFound from './screens/NotFound'
import ProjectDetail from './screens/ProjectDetail'
import Projects from './screens/Projects'
import Skills from './screens/Skills'
import Title from './screens/Title'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Title />} />
        <Route path="menu" element={<Menu />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="skills" element={<Skills />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
