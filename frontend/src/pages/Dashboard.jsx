import { SUBJECTS } from '../data/subjects.js'
import StudentCard from '../components/StudentCard.jsx'
import SubjectCard from '../components/SubjectCard.jsx'
import useUserStore from '../store/useUserStore.js'
import useCredits from '../hooks/useCredits.js'

export default function Dashboard() {
  const { user, questions } = useUserStore()
  const { totalCredits, dailyStreak } = useCredits()
  const student = {
    name: user.name,
    role: user.role,
    learningStyle: user.learningStyle,
    credits: totalCredits,
    streak: dailyStreak,
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-[#451a03]">Dashboard Studente</h1>
        <p className="text-amber-900/60 text-lg font-medium">Bentornato, pronto per una nuova sessione di studio?</p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-500/5 blur-2xl group-hover:bg-orange-500/10 transition-colors" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-900/40">Crediti Totali</p>
              <p className="text-5xl font-black text-orange-600 mt-2 tracking-tighter">{totalCredits}</p>
            </div>
            <p className="mt-4 text-xs font-bold text-amber-900/30 uppercase tracking-wider">Accumulati con impegno</p>
          </div>
          <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl group-hover:bg-amber-500/10 transition-colors" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-900/40">Daily Streak</p>
              <p className="text-5xl font-black text-amber-600 mt-2 tracking-tighter">{dailyStreak} <span className="text-2xl">GG</span></p>
            </div>
            <p className="mt-4 text-xs font-bold text-amber-900/30 uppercase tracking-wider">Continua la striscia!</p>
          </div>
        </div>
        <StudentCard student={student} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#451a03]">Le tue Materie</h2>
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest cursor-pointer hover:underline">Vedi tutte</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#451a03]">Attività Recenti</h2>
        {questions.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {questions.slice(0, 4).map((item) => (
              <div key={item.id} className="glass-card p-6 rounded-3xl border-orange-100 hover:border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40">{item.context}</p>
                  </div>
                  <span className="rounded-full bg-orange-500/5 border border-orange-500/10 px-3 py-1 text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                    Qualità {item.relevance}/5
                  </span>
                </div>
                <p className="text-sm font-bold text-[#451a03] line-clamp-1">{item.question}</p>
                <p className="mt-2 text-xs text-amber-900/60 line-clamp-2 leading-relaxed italic font-medium">"{item.answer}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 rounded-[2rem] text-center space-y-3">
            <div className="h-16 w-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-3xl">📝</div>
            <p className="text-amber-900/60 font-bold uppercase tracking-widest text-xs">Nessuna attività registrata oggi</p>
          </div>
        )}
      </section>
    </div>
  )
}
