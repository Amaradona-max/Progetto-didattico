import { LEARNING_STYLES } from '../data/learningStyles.js'
import useUserStore from '../store/useUserStore.js'

export default function LearningStyle() {
  const { user, setLearningStyle } = useUserStore()

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-surface/80 p-6">
        <h1 className="text-3xl font-semibold">Test Stile di Apprendimento</h1>
        <p className="mt-2 text-textSecondary">
          Il test individua il tuo stile dominante e adatta le risposte dell&apos;AI.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {Object.entries(LEARNING_STYLES).map(([key, style]) => (
          <button
            key={key}
            type="button"
            onClick={() => setLearningStyle(key)}
            className={`rounded-3xl border px-6 py-5 text-left transition ${
              user.learningStyle === key
                ? 'border-primary bg-primary/20'
                : 'border-white/10 bg-surface/80 hover:border-primary/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{style.icon}</span>
              <h3 className="text-xl font-semibold">{style.label}</h3>
            </div>
            <p className="mt-3 text-sm text-textSecondary">{style.desc}</p>
          </button>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-surface/80 p-6">
        <h2 className="text-xl font-semibold">Flusso consigliato</h2>
        <ol className="mt-4 grid gap-3 text-sm text-textSecondary md:grid-cols-2">
          <li>1. Questionario con 20 domande</li>
          <li>2. Calcolo percentuale per stile</li>
          <li>3. Generazione scheda personale</li>
          <li>4. Adattamento risposte AI</li>
        </ol>
      </section>
    </div>
  )
}
