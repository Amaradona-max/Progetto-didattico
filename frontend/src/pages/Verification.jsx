export default function Verification() {
  const questionTypes = [
    { label: 'Scelta Multipla', desc: 'Verifica rapida dei concetti' },
    { label: 'Domanda Aperta', desc: 'Valutazione AI su chiarezza e completezza' },
    { label: 'Vero/Falso', desc: 'Conferma conoscenze di base' },
    { label: 'Completamento', desc: 'Riempire spazi con termini corretti' },
    { label: 'Caso Pratico', desc: 'Applicazioni su situazioni reali' },
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-surface/80 p-6">
        <h1 className="text-3xl font-semibold">Fase di Verifica</h1>
        <p className="mt-2 text-textSecondary">
          L&apos;insegnante crea il quiz, lo studente lo completa senza supporto AI e riceve
          feedback dettagliato.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold">Flusso</h2>
          <ul className="mt-4 space-y-3 text-sm text-textSecondary">
            <li>1. Creazione quiz da parte del docente</li>
            <li>2. Notifica allo studente</li>
            <li>3. Sessione verificata senza AI</li>
            <li>4. Valutazione automatica e report</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold">Tipologie domande</h2>
          <div className="mt-4 space-y-3">
            {questionTypes.map((type) => (
              <div key={type.label} className="rounded-2xl bg-surfaceLight px-4 py-3">
                <p className="text-sm font-semibold">{type.label}</p>
                <p className="text-xs text-textSecondary">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
