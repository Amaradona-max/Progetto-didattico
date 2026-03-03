export default function DocumentViewer({ documents, activeId, onSelect }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
         <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
         <h3 className="text-sm font-black uppercase tracking-widest text-amber-900/40">Documenti Sessione</h3>
      </div>
      
      <div className="space-y-3">
        {documents.map((doc) => {
          const isActive = doc.id === activeId
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => onSelect(doc.id)}
              className={`w-full group rounded-2xl border p-4 text-left transition-all duration-300 ${
                isActive
                  ? 'border-orange-500/50 bg-orange-500/10 shadow-md shadow-orange-500/5'
                  : 'border-orange-100 bg-white/50 hover:border-orange-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
                  isActive ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-300'
                }`}>
                   {doc.id === 'all' ? '📚' : '📄'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className={`text-sm font-bold truncate ${isActive ? 'text-orange-900' : 'text-amber-900/80'}`}>{doc.title}</p>
                  <p className="text-[10px] font-bold text-amber-900/40 uppercase tracking-wider truncate mt-0.5">{doc.description}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
