import { SUBJECTS } from '../data/subjects.js'
import StudentCard from '../components/StudentCard.jsx'
import SubjectCard from '../components/SubjectCard.jsx'
import useUserStore from '../store/useUserStore.js'
import useCredits from '../hooks/useCredits.js'

export default function Dashboard() {
  const { user } = useUserStore()
  const { totalCredits, dailyStreak } = useCredits()
  const student = {
    name: user.name,
    role: user.role,
    learningStyle: user.learningStyle,
    credits: totalCredits,
    streak: dailyStreak,
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Dashboard Studente</h1>
          <p className="text-textSecondary">
            Benvenuto nella tua area personale. Scegli una materia e inizia una sessione di studio
            con l&apos;AI.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-surface/80 p-4">
              <p className="text-sm text-textSecondary">Crediti totali</p>
              <p className="text-2xl font-semibold text-accent">{totalCredits}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface/80 p-4">
              <p className="text-sm text-textSecondary">Streak attuale</p>
              <p className="text-2xl font-semibold">{dailyStreak} giorni</p>
            </div>
          </div>
        </div>
        <StudentCard student={student} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Materie disponibili</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {SUBJECTS.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>
    </div>
  )
}
