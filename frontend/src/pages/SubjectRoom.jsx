import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects.js'

export default function SubjectRoom() {
  const { subjectId } = useParams()
  const subject = SUBJECTS.find((item) => item.id === subjectId)
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const apiBase = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${apiBase}/api/documents?subjectId=${subjectId}`)
        if (!response.ok) {
          throw new Error('Errore nel caricamento dei documenti.')
        }
        const data = await response.json()
        setDocuments(data.documents || [])
      } catch {
        setDocuments([])
      } finally {
        setIsLoading(false)
      }
    }
    if (subjectId) {
      loadDocuments()
    }
  }, [apiBase, subjectId])

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-10" style={{ backgroundColor: subject?.color || '#ea580c' }} />
        <div className="relative flex flex-col md:flex-row md:items-center gap-8">
           <div className="h-24 w-24 rounded-[2rem] flex items-center justify-center text-5xl shadow-sm" style={{ backgroundColor: `${subject?.color}10`, color: subject?.color }}>
              {subject?.icon}
           </div>
           <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-[#451a03]">
                {subject ? subject.name : 'Materia'}
              </h1>
              <p className="text-amber-900/60 text-lg font-medium max-w-2xl">
                Benvenuto nella stanza di {subject?.name}. Materiali caldi e accoglienti per il tuo studio intelligente.
              </p>
           </div>
        </div>
      </section>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight px-2 text-[#451a03]">Documenti Disponibili</h2>
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="glass-card p-12 rounded-[2rem] col-span-full text-center">
              <div className="h-10 w-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-amber-900/40 font-bold uppercase tracking-widest text-xs">Sincronizzazione materiali...</p>
            </div>
          ) : documents.length ? (
            documents.map((doc) => (
              <div key={doc.id} className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-orange-200 transition-all">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                     📄
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-[#451a03] group-hover:text-orange-600 transition-colors line-clamp-2">{doc.title}</h3>
                  <p className="mt-3 text-sm text-amber-900/60 font-medium leading-relaxed line-clamp-3">
                    {doc.description || 'Analisi approfondita del materiale didattico fornito per il programma ministeriale.'}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-orange-50 flex items-center justify-between">
                   <div className="text-[10px] font-black uppercase tracking-widest text-amber-900/30">Pronto per AI</div>
                   <Link
                    to={`/study/${doc.id}`}
                    className="btn-primary !px-5 !py-2 text-xs"
                  >
                    Studia Ora
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card p-12 rounded-[2rem] col-span-full text-center border-dashed border-orange-200">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-amber-900/60 font-bold tracking-tight">Nessun documento disponibile per questa materia.</p>
              <p className="text-xs text-amber-900/40 mt-1 uppercase font-black tracking-widest">Contatta il tuo docente per i materiali</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
