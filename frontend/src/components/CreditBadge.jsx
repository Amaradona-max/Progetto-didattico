export default function CreditBadge({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/80 px-4 py-3">
      <span className="text-sm text-textSecondary">{label}</span>
      <span className="text-lg font-semibold text-accent">{value}</span>
    </div>
  )
}
