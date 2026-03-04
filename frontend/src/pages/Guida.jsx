import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Guida() {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    fetch('/Guida.md')
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
  }, [])

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <article className="prose lg:prose-xl mx-auto">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </div>
  )
}
