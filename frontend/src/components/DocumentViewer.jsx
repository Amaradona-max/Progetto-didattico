export default function DocumentViewer({ documents, activeId, onSelect }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Documenti</h3>
      <div className="space-y-2">
        {documents.map((doc) => {
          const isActive = doc.id === activeId
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => onSelect(doc.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? 'border-primary bg-primary/20'
                  : 'border-white/10 bg-surface/80 hover:border-primary/60'
              }`}
            >
              <p className="text-sm font-semibold">{doc.title}</p>
              <p className="text-xs text-textSecondary">{doc.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
