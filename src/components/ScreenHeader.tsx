import { Link } from 'react-router-dom'

type Props = { title: string; subtitle?: string; backTo?: string; backLabel?: string }

export default function ScreenHeader({
  title,
  subtitle,
  backTo = '/menu',
  backLabel = 'Back to menu',
}: Props) {
  return (
    <header>
      <Link to={backTo}>← {backLabel}</Link>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}
