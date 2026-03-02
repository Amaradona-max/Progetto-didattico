import CreditBadge from '../components/CreditBadge.jsx'
import useCredits from '../hooks/useCredits.js'

const badges = [
  { id: 'first_steps', name: 'Primi Passi', icon: '👶', target: 50 },
  { id: 'curious_mind', name: 'Mente Curiosa', icon: '🔍', target: 20 },
  { id: 'deep_thinker', name: 'Pensatore', icon: '🧠', target: 4 },
  { id: 'scholar', name: 'Studioso', icon: '📚', target: 500 },
  { id: 'top_student', name: 'Top Student', icon: '🏆', target: 1000 },
]

export default function Credits() {
  const { totalCredits, dailyStreak, lastQualityScore } = useCredits()

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-surface/80 p-6">
        <h1 className="text-3xl font-semibold">Crediti &amp; Badge</h1>
        <p className="mt-2 text-textSecondary">
          Guadagna crediti con domande di qualità e sblocca badge esclusivi.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <CreditBadge label="Crediti totali" value={totalCredits} />
        <CreditBadge label="Streak giornaliero" value={`${dailyStreak} giorni`} />
        <CreditBadge label="Qualità media" value={`${lastQualityScore} / 5`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Badge sbloccabili</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center justify-between rounded-3xl border border-white/10 bg-surface/80 p-5"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="text-sm font-semibold">{badge.name}</p>
                  <p className="text-xs text-textSecondary">Obiettivo: {badge.target}</p>
                </div>
              </div>
              <span className="rounded-full bg-surfaceLight px-3 py-1 text-xs text-textSecondary">
                In corso
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
