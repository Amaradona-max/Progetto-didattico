import { LEARNING_STYLES } from '../data/learningStyles.js'

export default function LearningStyleBadge({ styleKey }) {
  const style = LEARNING_STYLES[styleKey]
  if (!style) {
    return (
      <span className="rounded-full bg-orange-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-amber-900/40 border border-orange-100">
        Stile non definito
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-sm"
      style={{ backgroundColor: style.color, color: '#451a03' }}
    >
      <span className="text-base">{style.icon}</span>
      {style.label}
    </span>
  )
}
