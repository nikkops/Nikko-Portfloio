import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader'
import { site } from '../data/content'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }
  return (
    <section>
      <ScreenHeader title="Contact" subtitle="Reach out" />
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <button onClick={copy}>{copied ? 'Copied' : 'Copy email'}</button>
      {/* Resume button added once the PDF is uploaded */}
    </section>
  )
}
