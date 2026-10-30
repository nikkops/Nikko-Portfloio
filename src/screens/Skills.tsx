import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader'
import { skillTabs } from '../data/content'

export default function Skills() {
  const [activeId, setActiveId] = useState(skillTabs[0].id)
  const tab = skillTabs.find((t) => t.id === activeId) ?? skillTabs[0]
  return (
    <section>
      <ScreenHeader title="Skills" subtitle="Abilities" />
      <div role="tablist">
        {skillTabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === activeId}
            onClick={() => setActiveId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul>
        {tab.skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <h2>Certifications</h2>
      <ul>
        {tab.certs.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  )
}
