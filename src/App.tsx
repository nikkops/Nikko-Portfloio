import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Menu from './screens/Menu'
import Placeholder from './screens/Placeholder'
import Title from './screens/Title'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Title />} />
        <Route path="menu" element={<Menu />} />
        <Route path="about" element={<Placeholder title="About" />} />
        <Route path="projects" element={<Placeholder title="Projects" />} />
        <Route path="skills" element={<Placeholder title="Skills" />} />
        <Route path="leadership" element={<Placeholder title="Leadership" />} />
        <Route path="contact" element={<Placeholder title="Contact" />} />
        <Route path="*" element={<Placeholder title="Not found" />} />
      </Route>
    </Routes>
  )
}
