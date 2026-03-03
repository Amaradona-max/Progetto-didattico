import { LEARNING_STYLES } from '../data/learningStyles.js'
import useUserStore from '../store/useUserStore.js'

export default function LearningStyle() {
  const { user, setLearningStyle } = useUserStore()

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <h1 className="text-4xl font-black tracking-tight text-[#451a03]">Stile di Apprendimento</h1>
        <p className="mt-2 text-amber-900/60 text-lg font-medium">
          Personalizza la tua esperienza. L'AI adatterà il suo linguaggio al tuo modo di imparare.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {Object.entries(LEARNING_STYLES).map(([key, style]) => (
          <button
            key={key}
            type="button"
            onClick={() => setLearningStyle(key)}
            className={`group rounded-[2rem] border p-8 text-left transition-all duration-300 glass-card ${
              user.learningStyle === key
                ? 'border-orange-500 bg-orange-50 shadow-xl shadow-orange-500/10'
                : 'border-orange-100 hover:border-orange-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">{style.icon}</span>
              <div>
                <h3 className={`text-xl font-black tracking-tight ${user.learningStyle === key ? 'text-orange-600' : 'text-[#451a03]'}`}>{style.label}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mt-0.5">Metodo ottimizzato</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-amber-900/60 font-medium leading-relaxed">{style.desc}</p>
          </button>
        ))}
      </section>

      <section className="glass-card p-10 rounded-[2.5rem] border-dashed border-orange-200">
        <h2 className="text-xl font-black text-[#451a03] mb-6">Come funziona il test?</h2>
        <div className="grid gap-6 text-sm md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: '01', t: 'Analisi iniziale', d: 'Rispondi a poche domande mirate' },
            { n: '02', t: 'Calcolo', d: 'L\'algoritmo definisce il tuo profilo' },
            { n: '03', t: 'Profilazione', d: 'Viene creata la tua scheda tecnica' },
            { n: '04', t: 'Adattamento', d: 'L\'AI cambia il suo modo di spiegare' },
          ].map(item => (
            <div key={item.n} className="space-y-2">
               <span className="text-2xl font-black text-orange-200">{item.n}</span>
               <p className="font-bold text-[#451a03]">{item.t}</p>
               <p className="text-amber-900/50 font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
