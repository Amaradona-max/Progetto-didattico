import LearningStyleBadge from './LearningStyleBadge.jsx'

export default function StudentCard({ student }) {
  return (
    <div className="glass-card p-8 rounded-[2rem] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative flex flex-col items-center text-center gap-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-orange-100 bg-white p-1 overflow-hidden shadow-md transition-transform group-hover:scale-105">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} alt="avatar" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-orange-500 border-4 border-[#fdfaf6] flex items-center justify-center text-[10px] font-bold text-white">
            ON
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-black tracking-tight text-[#451a03]">{student.name}</p>
          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">{student.role}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 mb-1">XP Crediti</p>
            <p className="text-xl font-black text-orange-600">{student.credits}</p>
          </div>
          <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 mb-1">Streak</p>
            <p className="text-xl font-black text-amber-600">{student.streak} <span className="text-xs uppercase">gg</span></p>
          </div>
        </div>
        
        <div className="w-full pt-4 border-t border-orange-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 mb-3">Stile di Apprendimento</p>
          <div className="flex justify-center">
            <LearningStyleBadge styleKey={student.learningStyle} />
          </div>
        </div>
      </div>
    </div>
  )
}
