import { Link } from 'react-router-dom'

export default function Placeholder({ title }: { title: string }) {
  return (
    <section>
      <h1>{title}</h1>
      <p>Coming soon.</p>
      <Link to="/menu">Back to menu</Link>
    </section>
  )
}
