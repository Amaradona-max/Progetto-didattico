export default function Verification() {
  const questionTypes = [
    { label: 'Scelta Multipla', desc: 'Verifica rapida dei concetti' },
    { label: 'Domanda Aperta', desc: 'Valutazione AI su chiarezza e completezza' },
    { label: 'Vero/Falso', desc: 'Conferma conoscenze di base' },
    { label: 'Completamento', desc: 'Riempire spazi con termini corretti' },
    { label: 'Caso Pratico', desc: 'Applicazioni su situazioni reali' },
  ]

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <h1 className="text-4xl font-black tracking-tight text-[#451a03]">Verifica Apprendimento</h1>
        <p className="mt-2 text-amber-900/60 text-lg font-medium">
          Mettiti alla prova senza supporto AI. Una valutazione pura della tua preparazione.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#451a03]">Flusso Operativo</h2>
          <div className="space-y-4">
            {[
              { s: '01', t: 'Preparazione', d: 'Il docente genera il quiz specifico' },
              { s: '02', t: 'Notifica', d: 'Ricevi un avviso sulla tua dashboard' },
              { s: '03', t: 'Esecuzione', d: 'Sessione blindata senza assistenza AI' },
              { s: '04', t: 'Report', d: 'Analisi automatica e voto finale' },
            ].map(item => (
              <div key={item.s} className="flex gap-4 items-start">
                 <span className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center text-xs font-black text-orange-600 shrink-0">{item.s}</span>
                 <div>
                    <p className="font-bold text-[#451a03]">{item.t}</p>
                    <p className="text-xs text-amber-900/50 font-medium">{item.d}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#451a03]">Tipologie Domande</h2>
          <div className="grid gap-3">
            {questionTypes.map((type) => (
              <div key={type.label} className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 group hover:bg-white transition-all">
                <p className="text-sm font-bold text-[#451a03]">{type.label}</p>
                <p className="text-xs text-amber-900/40 font-medium mt-0.5">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-card p-10 rounded-[2.5rem] border-dashed border-orange-200">
        <div className="flex items-center gap-4 mb-6">
           <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-2xl">🎯</div>
           <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#451a03]">Caccia all'Errore</h2>
              <p className="text-sm text-amber-900/50 font-medium italic">Sviluppa il tuo spirito critico analizzando soluzioni errate</p>
           </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            'Identifica bias cognitivi',
            'Correggi procedure tecniche',
            'Confronta diverse varianti',
            'Valuta l\'impatto dell\'errore',
          ].map((item) => (
            <div key={item} className="p-4 rounded-xl bg-white border border-orange-50 text-[11px] font-black uppercase tracking-widest text-orange-600 text-center shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
