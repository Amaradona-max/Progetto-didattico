import LearningStyleBadge from './LearningStyleBadge.jsx'

export default function StudentCard({ student }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-semibold">
          {student.name.slice(0, 1)}
        </div>
        <div>
          <p className="text-xl font-semibold">{student.name}</p>
          <p className="text-sm text-textSecondary">Profilo studente · {student.role}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <LearningStyleBadge styleKey={student.learningStyle} />
        <span className="rounded-full bg-surfaceLight px-4 py-2 text-xs text-textSecondary">
          Crediti: {student.credits}
        </span>
        <span className="rounded-full bg-surfaceLight px-4 py-2 text-xs text-textSecondary">
          Streak: {student.streak} giorni
        </span>
      </div>
    </div>
  )
}
