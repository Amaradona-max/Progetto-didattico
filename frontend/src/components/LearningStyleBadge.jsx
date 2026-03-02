import { LEARNING_STYLES } from '../data/learningStyles.js'

export default function LearningStyleBadge({ styleKey }) {
  const style = LEARNING_STYLES[styleKey]
  if (!style) {
    return (
      <span className="rounded-full bg-surfaceLight px-4 py-2 text-xs text-textSecondary">
        Stile non definito
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
      style={{ backgroundColor: style.color, color: '#111827' }}
    >
      {style.icon}
      {style.label}
    </span>
  )
}
