import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatAI from '../components/ChatAI.jsx'
import DocumentViewer from '../components/DocumentViewer.jsx'
import useCredits from '../hooks/useCredits.js'
import useAI from '../hooks/useAI.js'

const demoDocuments = [
  {
    id: 'diritto-1',
    title: 'Costituzione italiana',
    description: 'Principi fondamentali e diritti',
  },
  {
    id: 'matematica-1',
    title: 'Equazioni di primo grado',
    description: 'Risoluzione e applicazioni pratiche',
  },
  {
    id: 'fisica-1',
    title: 'Leggi di Newton',
    description: 'Moto, forze e applicazioni',
  },
]

export default function StudySession() {
  const { documentId } = useParams()
  const initialId = useMemo(
    () => demoDocuments.find((doc) => doc.id === documentId)?.id || demoDocuments[0].id,
    [documentId]
  )
  const [activeId, setActiveId] = useState(initialId)
  const { totalCredits, addCredits, lastQualityScore, setQualityScore } = useCredits()
  const { ask } = useAI()
  const [lastFeedback, setLastFeedback] = useState('')

  const handleEvaluate = async (question) => {
    const result = await ask(question, activeId)
    addCredits(result.credits_earned)
    setQualityScore(result.quality_score)
    setLastFeedback(result.feedback)
    return result
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <h1 className="text-2xl font-semibold">Sessione di Studio</h1>
          <p className="mt-2 text-sm text-textSecondary">
            Seleziona un documento e interroga l&apos;AI. I crediti aumentano in base alla qualità
            della domanda.
          </p>
          <div className="mt-4 flex gap-3">
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">
              Crediti: {totalCredits}
            </span>
            <span className="rounded-full bg-warning/20 px-3 py-1 text-xs text-warning">
              Qualità: {lastQualityScore}
            </span>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <DocumentViewer documents={demoDocuments} activeId={activeId} onSelect={setActiveId} />
        </div>
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <h3 className="text-lg font-semibold">Feedback AI</h3>
          <p className="mt-2 text-sm text-textSecondary">
            {lastFeedback || 'Fai una domanda per ricevere un feedback personalizzato.'}
          </p>
        </div>
      </aside>
      <section className="min-h-[600px]">
        <ChatAI onEvaluate={handleEvaluate} />
      </section>
    </div>
  )
}
