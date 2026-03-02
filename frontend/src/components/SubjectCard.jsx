import { Link } from 'react-router-dom'

export default function SubjectCard({ subject }) {
  return (
    <Link
      to={`/subject/${subject.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/80 p-4 transition hover:border-primary/60"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
        style={{ backgroundColor: subject.color }}
      >
        {subject.icon}
      </div>
      <div className="flex-1">
        <p className="text-lg font-semibold">{subject.name}</p>
        <p className="text-sm text-textSecondary">Stanza dedicata e materiali</p>
      </div>
      <span className="text-sm text-textSecondary transition group-hover:text-white">Apri</span>
    </Link>
  )
}
