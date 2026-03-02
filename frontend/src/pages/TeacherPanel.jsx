import { useEffect, useRef, useState } from 'react'
import { SUBJECTS } from '../data/subjects.js'

export default function TeacherPanel() {
  const [subjectId, setSubjectId] = useState(SUBJECTS[0]?.id || '')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [uploadedDocs, setUploadedDocs] = useState([])
  const fileInputRef = useRef(null)
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000'

  const loadDocuments = async () => {
    try {
      const response = await fetch(`${apiBase}/api/documents?subjectId=${subjectId}`)
      if (!response.ok) {
        throw new Error('Errore nel caricamento dei documenti.')
      }
      const data = await response.json()
      setUploadedDocs(data.documents || [])
    } catch {
      setUploadedDocs([])
    }
  }

  useEffect(() => {
    if (subjectId) {
      loadDocuments()
    }
  }, [apiBase, subjectId])

  const handleSelectFile = (event) => {
    const selected = Array.from(event.target.files || [])
    setFiles(selected)
  }

  const handleUpload = async () => {
    if (!files.length) {
      setStatus({ type: 'error', message: 'Seleziona almeno un file da caricare.' })
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
      files.forEach((item) => formData.append('documents', item))
      const response = await fetch(`${apiBase}/api/documents/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.error || 'Errore durante il caricamento.')
      }
      const result = await response.json()
      const newDocs = result.documents || []
      setStatus({
        type: 'success',
        message: `Documenti caricati: ${newDocs.length || files.length}`,
      })
      await loadDocuments()
      setFiles([])
      setTitle('')
      setDescription('')
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Errore durante il caricamento.',
      })
    }
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl" />
        <div className="relative space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-[#451a03]">Pannello Insegnante</h1>
          <p className="text-amber-900/60 text-lg font-medium max-w-2xl">
            Gestisci materiali didattici in un ambiente caldo e professionale. AI pronta a supportare i tuoi studenti.
          </p>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card p-10 rounded-[2.5rem] space-y-8 border-orange-100">
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
             </div>
             <h2 className="text-2xl font-bold tracking-tight text-[#451a03]">Caricamento File</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 ml-4">Materia di riferimento</label>
               <select
                value={subjectId}
                onChange={(event) => setSubjectId(event.target.value)}
                className="w-full rounded-2xl border border-orange-100 bg-orange-50/30 px-6 py-4 text-sm text-[#451a03] font-bold outline-none focus:border-orange-500/50 transition-all appearance-none"
              >
                {SUBJECTS.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 ml-4">Titolo Dispensa</label>
               <input
                placeholder="Es: Introduzione alla Termodinamica"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-orange-100 bg-orange-50/30 px-6 py-4 text-sm text-[#451a03] font-bold outline-none focus:border-orange-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 ml-4">Sintesi Contenuto</label>
               <textarea
                placeholder="Di cosa tratta questo materiale?"
                rows="3"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-2xl border border-orange-100 bg-orange-50/30 px-6 py-4 text-sm text-[#451a03] font-bold outline-none focus:border-orange-500/50 transition-all resize-none"
              />
            </div>

            <div 
              className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-orange-200 bg-orange-50/20 py-10 text-center group cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
              </div>
              <div className="space-y-1">
                 <p className="text-sm font-bold text-[#451a03]">Seleziona i tuoi file</p>
                 <p className="text-xs text-amber-900/40 font-bold uppercase tracking-wider">PDF, DOCX, PPTX</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                multiple
                onChange={handleSelectFile}
                className="hidden"
              />
            </div>

            {files.length > 0 && (
              <div className="glass-card p-4 rounded-2xl space-y-2 border-orange-200">
                 <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">File pronti ({files.length})</p>
                 <div className="max-h-24 overflow-y-auto space-y-1">
                    {files.map(f => (
                      <div key={f.name} className="flex items-center justify-between text-xs text-amber-900/60 font-bold">
                        <span className="truncate max-w-[200px]">{f.name}</span>
                        <span>{(f.size/1024).toFixed(0)} KB</span>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleUpload}
              disabled={status.type === 'loading'}
              className="btn-primary !w-full !py-4 flex items-center justify-center gap-3"
            >
              {status.type === 'loading' ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Elaborazione...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  Pubblica Materiali
                </>
              )}
            </button>

            {status.message && (
              <div
                className={`rounded-2xl border px-6 py-4 text-xs font-black uppercase tracking-widest ${
                  status.type === 'error'
                    ? 'border-red-500/20 bg-red-500/10 text-red-600'
                    : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                }`}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[2.5rem] space-y-6 border-orange-100">
            <h3 className="text-xl font-bold tracking-tight text-[#451a03]">Workflow di Processing</h3>
            <div className="space-y-4">
              {[
                { step: 'Controllo', desc: 'Validazione formati e sicurezza' },
                { step: 'Analisi', desc: 'Estrazione semantica del testo' },
                { step: 'AI Sync', desc: 'Creazione indici per domande' },
                { step: 'Attivo', desc: 'Materiale online per gli studenti' },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 text-sm font-black group-hover:bg-orange-600 group-hover:text-white transition-all">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#451a03] tracking-tight">{item.step}</p>
                    <p className="text-xs text-amber-900/40 font-bold uppercase tracking-widest">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group border-orange-100">
            <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold tracking-tight text-[#451a03]">Archivio Locale</h3>
              <span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] font-black text-orange-600 uppercase tracking-widest">
                {uploadedDocs.length} FILE
              </span>
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {uploadedDocs.length ? (
                uploadedDocs.map((doc) => (
                  <div key={doc.id} className="glass-card p-4 rounded-2xl border-orange-50 bg-white/50 hover:border-orange-200 hover:bg-white transition-all flex items-center justify-between">
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-[#451a03] truncate">{doc.title}</p>
                      <p className="text-[10px] font-bold text-amber-900/40 truncate uppercase tracking-widest">{doc.fileName}</p>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center text-xs">
                       📄
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 space-y-2">
                   <div className="text-2xl grayscale">📁</div>
                   <p className="text-xs font-bold text-amber-900/30 uppercase tracking-widest">Archivio vuoto</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
