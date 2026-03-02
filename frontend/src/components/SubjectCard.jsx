import { Link } from 'react-router-dom'

export default function SubjectCard({ subject }) {
  return (
    <Link
      to={`/subject/${subject.id}`}
      className="group glass-card flex items-center gap-5 p-5 rounded-[2rem] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3"
        style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
      >
        <div className="absolute inset-0 rounded-2xl bg-current opacity-10 animate-pulse" />
        {subject.icon}
      </div>
      
      <div className="flex-1 relative">
        <p className="text-lg font-bold tracking-tight text-[#451a03] group-hover:text-orange-600 transition-colors">{subject.name}</p>
        <p className="text-xs font-bold text-amber-900/40 uppercase tracking-widest mt-0.5">Stanza AI & Risorse</p>
      </div>
      
      <div className="relative h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-600 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-orange-200 group-hover:text-white group-hover:translate-x-0.5 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </Link>
  )
}
