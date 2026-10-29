import { Link } from 'react-router-dom'
import { menuItems } from '../data/content'

export default function Menu() {
  return (
    <nav aria-label="Main menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>
              {item.label} <small>{item.subtitle}</small>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
