import { useRef, useState } from 'react'
import { SUBJECTS } from '../data/subjects.js'

export default function TeacherPanel() {
  const [subjectId, setSubjectId] = useState(SUBJECTS[0]?.id || '')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const fileInputRef = useRef(null)
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000'

  const handleSelectFile = (event) => {
    const selected = event.target.files?.[0] || null
    setFile(selected)
  }

  const handleUpload = async () => {
    if (!file) {
      setStatus({ type: 'error', message: 'Seleziona un file da caricare.' })
      return
    }
    if (!subjectId) {
      setStatus({ type: 'error', message: 'Seleziona una materia.' })
      return
    }
    setStatus({ type: 'loading', message: 'Caricamento in corso...' })
    try {
      const formData = new FormData()
      formData.append('subjectId', subjectId)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('document', file)
      const response = await fetch(`${apiBase}/api/documents/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.error || 'Errore durante il caricamento.')
      }
      const result = await response.json()
      setStatus({
        type: 'success',
        message: `Documento caricato: ${result.document?.fileName || file.name}`,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Errore durante il caricamento.',
      })
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-surface/80 p-6">
        <h1 className="text-3xl font-semibold">Pannello Insegnante</h1>
        <p className="mt-2 text-textSecondary">
          Carica materiali, configura l&apos;AI per ogni documento e monitora le domande degli
          studenti.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold">Upload documento</h2>
          <div className="mt-4 space-y-3">
            <select
              value={subjectId}
              onChange={(event) => setSubjectId(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-dark px-4 py-3 text-sm text-textPrimary"
            >
              {SUBJECTS.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Titolo documento"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-dark px-4 py-3 text-sm text-textPrimary"
            />
            <textarea
              placeholder="Descrizione"
              rows="4"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-dark px-4 py-3 text-sm text-textPrimary"
            />
            <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-white/20 bg-dark px-4 py-4 text-sm text-textSecondary">
              <div className="flex items-center justify-between">
                <span>Trascina PDF, DOCX o PPTX</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full bg-primary px-4 py-2 text-xs text-white"
                >
                  Seleziona file
                </button>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>{file ? file.name : 'Nessun file selezionato'}</span>
                <span>{file ? `${Math.round(file.size / 1024)} KB` : ''}</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                onChange={handleSelectFile}
                className="hidden"
              />
            </div>
            <button
              type="button"
              onClick={handleUpload}
              disabled={status.type === 'loading'}
              className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {status.type === 'loading' ? 'Caricamento...' : 'Carica documento'}
            </button>
            {status.message ? (
              <div
                className={`rounded-2xl border px-4 py-3 text-xs ${
                  status.type === 'error'
                    ? 'border-red-500/40 bg-red-500/10 text-red-200'
                    : status.type === 'success'
                      ? 'border-accent/40 bg-accent/10 text-accent'
                      : 'border-white/10 bg-surfaceLight text-textSecondary'
                }`}
              >
                {status.message}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold">Pipeline di processing</h2>
          {[
            'Validazione formato e dimensione',
            'Estrazione testo e pulizia',
            'Chunking intelligente per AI',
            'Indicizzazione e disponibilità',
          ].map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm">
                {index + 1}
              </div>
              <span className="text-sm text-textSecondary">{step}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
