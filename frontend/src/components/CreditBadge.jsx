export default function CreditBadge({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white/50 px-6 py-4 shadow-sm">
      <span className="text-xs font-black uppercase tracking-widest text-amber-900/40">{label}</span>
      <span className="text-xl font-black text-orange-600 tracking-tight">{value}</span>
    </div>
  )
}
