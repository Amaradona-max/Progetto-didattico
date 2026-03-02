import { Link } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects.js'

export default function Landing() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-surfaceLight px-4 py-2 text-xs text-textSecondary">
            Tutor AI personalizzato per il biennio ITIS
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Ogni documento diventa un tutor interattivo
          </h1>
          <p className="text-lg text-textSecondary">
            EduMind trasforma i materiali didattici in percorsi di studio adattivi, con
            chat intelligente, gamification e valutazioni mirate.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              Entra nella dashboard
            </Link>
            <Link
              to="/learning-style"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
            >
              Scopri il tuo stile
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Micro-quiz', value: '15+ modelli' },
              { label: 'Crediti XP', value: 'Gamification' },
              { label: 'AI Claude', value: 'Risposte rapide' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-surface/80 px-4 py-3"
              >
                <p className="text-sm text-textSecondary">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-surface to-surfaceLight p-6">
            <p className="text-sm text-textSecondary">Stanza AI attiva</p>
            <h2 className="mt-3 text-2xl font-semibold">Sessione di studio guidata</h2>
            <p className="mt-3 text-sm text-textSecondary">
              Seleziona un documento, fai domande e accumula crediti per ogni risposta di qualità.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">
                48 crediti oggi
              </div>
              <div className="rounded-full bg-warning/20 px-3 py-1 text-xs text-warning">
                Qualità 4.2
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
            <p className="text-sm text-textSecondary">Materie disponibili</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SUBJECTS.slice(0, 6).map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center gap-3 rounded-2xl bg-surfaceLight px-3 py-2"
                >
                  <span>{subject.icon}</span>
                  <span className="text-sm">{subject.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
