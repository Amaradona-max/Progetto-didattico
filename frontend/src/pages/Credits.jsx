import CreditBadge from '../components/CreditBadge.jsx'
import useCredits from '../hooks/useCredits.js'

const badges = [
  { id: 'first_steps', name: 'Primi Passi', icon: '👶', target: 50 },
  { id: 'curious_mind', name: 'Mente Curiosa', icon: '🔍', target: 20 },
  { id: 'deep_thinker', name: 'Pensatore', icon: '🧠', target: 4 },
  { id: 'scholar', name: 'Studioso', icon: '📚', target: 500 },
  { id: 'top_student', name: 'Top Student', icon: '🏆', target: 1000 },
]

export default function Credits() {
  const { totalCredits, dailyStreak, lastQualityScore } = useCredits()

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <h1 className="text-4xl font-black tracking-tight text-[#451a03]">Crediti & Achievement</h1>
        <p className="mt-2 text-amber-900/60 text-lg font-medium">
          Il tuo impegno viene premiato. Accumula XP e sblocca nuovi traguardi.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="glass-card p-8 rounded-3xl border-orange-100 flex flex-col items-center text-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 mb-2">XP Totali</p>
           <p className="text-4xl font-black text-orange-600">{totalCredits}</p>
        </div>
        <div className="glass-card p-8 rounded-3xl border-orange-100 flex flex-col items-center text-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 mb-2">Striscia Attuale</p>
           <p className="text-4xl font-black text-orange-600">{dailyStreak} <span className="text-xl">gg</span></p>
        </div>
        <div className="glass-card p-8 rounded-3xl border-orange-100 flex flex-col items-center text-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 mb-2">Qualità Risposte</p>
           <p className="text-4xl font-black text-orange-600">{lastQualityScore}<span className="text-xl">/5</span></p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight px-2 text-[#451a03]">Badge da Sbloccare</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="glass-card flex items-center justify-between p-6 rounded-3xl group hover:border-orange-300 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm">
                   {badge.icon}
                </div>
                <div>
                  <p className="text-lg font-bold text-[#451a03]">{badge.name}</p>
                  <p className="text-xs font-bold text-amber-900/40 uppercase tracking-widest">Obiettivo: {badge.target} XP</p>
                </div>
              </div>
              <div className="h-8 px-4 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[10px] font-black text-orange-600 uppercase tracking-widest">
                In corso
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
