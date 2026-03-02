import { Link, useParams } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects.js'

const documentsBySubject = {
  diritto: [
    {
      id: 'diritto-1',
      title: 'Costituzione italiana',
      description: 'Principi fondamentali e diritti',
    },
    {
      id: 'diritto-2',
      title: 'Ordinamento dello Stato',
      description: 'Parlamento, Governo e magistratura',
    },
  ],
}

export default function SubjectRoom() {
  const { subjectId } = useParams()
  const subject = SUBJECTS.find((item) => item.id === subjectId)
  const documents = documentsBySubject[subjectId] || [
    {
      id: `${subjectId}-intro`,
      title: 'Introduzione alla materia',
      description: 'Panoramica dei concetti base',
    },
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-surface/80 p-6">
        <h1 className="text-3xl font-semibold">
          {subject ? subject.name : 'Materia'}
        </h1>
        <p className="mt-2 text-textSecondary">
          Accedi ai documenti caricati dagli insegnanti e avvia una sessione di studio con l&apos;AI.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="rounded-3xl border border-white/10 bg-surface/80 p-6"
          >
            <h3 className="text-lg font-semibold">{doc.title}</h3>
            <p className="mt-2 text-sm text-textSecondary">{doc.description}</p>
            <Link
              to={`/study/${doc.id}`}
              className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white"
            >
              Avvia sessione
            </Link>
          </div>
        ))}
      </section>
    </div>
  )
}
