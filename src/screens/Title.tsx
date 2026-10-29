import { useNavigate } from 'react-router-dom'
import { site } from '../data/content'

export default function Title() {
  const navigate = useNavigate()
  return (
    <button className="title-screen" onClick={() => navigate('/menu')}>
      <h1>{site.title}</h1>
      <p>{site.tagline}</p>
      <span>Click anywhere to enter</span>
    </button>
  )
}
