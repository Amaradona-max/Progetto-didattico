import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatAI from '../components/ChatAI.jsx'
import DocumentViewer from '../components/DocumentViewer.jsx'
import useCredits from '../hooks/useCredits.js'
import useAI from '../hooks/useAI.js'
import useUserStore from '../store/useUserStore.js'

export default function StudySession() {
  const { documentId } = useParams()
  const [documents, setDocuments] = useState([])
  const [activeSubjectId, setActiveSubjectId] = useState('')
  const [activeId, setActiveId] = useState('')
  const { totalCredits, addCredits, lastQualityScore, setQualityScore } = useCredits()
  const { ask } = useAI()
  const [lastFeedback, setLastFeedback] = useState('')
  const { addQuestion } = useUserStore()
  const apiBase = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await fetch(`${apiBase}/api/documents`)
        if (!response.ok) {
          throw new Error('Errore nel caricamento dei documenti.')
        }
        const data = await response.json()
        const allDocs = data.documents || []
        if (documentId) {
          const match = allDocs.find((doc) => doc.id === documentId)
          if (match) {
            setActiveSubjectId(match.subjectId)
            setDocuments(allDocs.filter((doc) => doc.subjectId === match.subjectId))
            return
          }
        }
        setActiveSubjectId(allDocs[0]?.subjectId || '')
        setDocuments(allDocs)
      } catch {
        setDocuments([])
      }
    }
    loadDocuments()
  }, [apiBase, documentId])

  useEffect(() => {
    if (!documents.length) {
      setActiveId('')
      return
    }
    const matched = documents.find((doc) => doc.id === documentId)
    setActiveId(matched ? matched.id : 'all')
    if (matched) {
      setActiveSubjectId(matched.subjectId)
    }
  }, [documents, documentId])

  const handleEvaluate = async (question) => {
    if (!activeId) {
      const message = 'Carica un documento prima di iniziare la sessione.'
      setLastFeedback(message)
      return {
        answer: message,
        feedback: message,
        quality_score: 1,
        credits_earned: 0,
      }
    }
    const contextQuery =
      activeId === 'all'
        ? activeSubjectId
          ? `subjectId=${activeSubjectId}`
          : ''
        : `documentId=${activeId}`
    const contextResponse = contextQuery
      ? await fetch(`${apiBase}/api/documents/context?${contextQuery}`)
      : null
    const contextData = contextResponse ? await contextResponse.json().catch(() => ({})) : {}
    const contextText = contextData.context || ''
    const result = await ask(question, contextText)
    addCredits(result.credits_earned)
    setQualityScore(result.quality_score)
    setLastFeedback(result.feedback)
    addQuestion({
      id: crypto.randomUUID(),
      question,
      answer: result.answer,
      relevance: result.quality_score,
      context: activeId === 'all' ? `Materia:${activeSubjectId}` : activeId,
      createdAt: new Date().toISOString(),
    })
    return result
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr] animate-in fade-in duration-700">
      <aside className="space-y-6">
        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <div className="h-10 w-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/><path d="M15 2h-6"/></svg>
             </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight leading-tight text-[#451a03]">Sessione Studio AI</h1>
          <p className="mt-3 text-sm text-amber-900/60 leading-relaxed font-medium">
            Sperimenta un nuovo modo di imparare con toni caldi e risposte precise dai tuoi documenti.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-2 text-xs font-black text-orange-600 uppercase tracking-widest">
              XP: {totalCredits}
            </span>
            <span className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-xs font-black text-amber-600 uppercase tracking-widest">
              QUALITÀ: {lastQualityScore}/5
            </span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem]">
          {documents.length ? (
            <DocumentViewer
              documents={[
                {
                  id: 'all',
                  title: 'Tutti i documenti',
                  description: 'Intero programma materia',
                },
                ...documents,
              ]}
              activeId={activeId}
              onSelect={setActiveId}
            />
          ) : (
            <p className="text-sm text-amber-900/40 font-bold uppercase tracking-widest text-center py-4">
              Nessun file caricato.
            </p>
          )}
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] border-orange-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/30 mb-2">Feedback Ultima Risposta</p>
          <p className="text-sm text-amber-900/70 font-bold leading-relaxed">
            {lastFeedback || 'Nessun feedback disponibile.'}
          </p>
        </div>
      </aside>

      <section className="h-[750px] relative">
        <ChatAI onEvaluate={handleEvaluate} />
      </section>
    </div>
  )
}
