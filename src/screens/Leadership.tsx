import ScreenHeader from '../components/ScreenHeader'
import { roles } from '../data/content'

export default function Leadership() {
  return (
    <section>
      <ScreenHeader title="Leadership" subtitle="Bonds" />
      <ol>
        {roles.map((r) => (
          <li key={`${r.title}-${r.start}`}>
            {r.title}, {r.org} ({r.start} to {r.end})
          </li>
        ))}
      </ol>
    </section>
  )
}
