import { Link } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects.js'

export default function Landing() {
  return (
    <div className="space-y-20 py-10 animate-in fade-in duration-700">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-orange-500/10 border border-orange-500/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Tutor AI personalizzato ITIS
          </div>
          <h1 className="text-5xl font-black leading-[1.1] md:text-7xl tracking-tight text-[#451a03]">
            Studia in modo <span className="text-orange-600">intelligente</span>, con calma.
          </h1>
          <p className="text-xl text-amber-900/70 leading-relaxed max-w-xl font-medium">
            EduMind trasforma i tuoi materiali didattici in un'esperienza accogliente e interattiva. Chiedi, impara e cresci ogni giorno.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/dashboard"
              className="btn-primary flex items-center gap-2"
            >
              Inizia Ora
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link
              to="/learning-style"
              className="px-8 py-3 rounded-2xl border border-orange-200 bg-white/50 font-bold text-orange-700 hover:bg-white transition-all shadow-sm"
            >
              Scopri il tuo stile
            </Link>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {[
              { label: 'Quiz interattivi', value: '15+ tipi' },
              { label: 'Gamification', value: 'Badge & XP' },
              { label: 'Risposte Istantanee', value: 'AI Claude' },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card p-4 rounded-3xl"
              >
                <p className="text-xs font-bold text-amber-900/40 uppercase tracking-wider">{item.label}</p>
                <p className="text-lg font-bold text-[#451a03] mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/10 to-amber-500/10 blur-3xl rounded-full" />
          <div className="relative glass-card p-8 rounded-[2.5rem] space-y-8 border-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-orange-200" />
                <div className="h-3 w-3 rounded-full bg-orange-300" />
                <div className="h-3 w-3 rounded-full bg-orange-400" />
              </div>
              <div className="text-xs font-bold text-amber-900/30">SESSIONE_STUDIO_WARM</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-500 flex-shrink-0" />
                <div className="bg-orange-50 p-4 rounded-2xl rounded-tl-none text-sm text-amber-900 font-medium">
                  Ciao! Ho preparato una sintesi calda dei tuoi appunti di Chimica. Iniziamo?
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-orange-600 p-4 rounded-2xl rounded-tr-none text-sm text-white font-bold">
                  Sì! Aiutami a capire meglio le moli.
                </div>
                <div className="h-8 w-8 rounded-full bg-amber-200 flex-shrink-0" />
              </div>
            </div>

            <div className="pt-6 border-t border-orange-100 flex items-center justify-between">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-orange-50 overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" />
                    </div>
                  ))}
               </div>
               <div className="text-sm font-bold text-orange-600">+124 Studenti online</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-3">
           <h2 className="text-3xl font-black text-[#451a03]">Materie Supportate</h2>
           <p className="text-amber-900/50 font-medium">Impara con i toni caldi dell'efficienza</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {SUBJECTS.map((subject) => (
            <div
              key={subject.id}
              className="glass-card flex flex-col items-center justify-center gap-3 p-6 rounded-3xl group cursor-default"
            >
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl text-3xl group-hover:scale-110 transition-transform shadow-md" style={{ backgroundColor: `${subject.color}15`, color: subject.color }}>
                {subject.icon}
              </div>
              <span className="font-bold text-sm tracking-tight text-[#451a03]">{subject.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
