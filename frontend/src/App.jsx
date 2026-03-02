import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TeacherPanel from './pages/TeacherPanel.jsx'
import SubjectRoom from './pages/SubjectRoom.jsx'
import StudySession from './pages/StudySession.jsx'
import LearningStyle from './pages/LearningStyle.jsx'
import Credits from './pages/Credits.jsx'
import Verification from './pages/Verification.jsx'

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? 'bg-primary text-white' : 'text-textSecondary hover:text-white'
  }`

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark text-textPrimary">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-dark/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-xl font-bold">
                E
              </div>
              <div>
                <p className="text-lg font-semibold">EduMind</p>
                <p className="text-xs text-textSecondary">Tutor intelligente per il biennio ITIS</p>
              </div>
            </div>
            <nav className="hidden items-center gap-2 md:flex">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/teacher" className={linkClass}>
                Docenti
              </NavLink>
              <NavLink to="/credits" className={linkClass}>
                Crediti
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teacher" element={<TeacherPanel />} />
            <Route path="/subject/:subjectId" element={<SubjectRoom />} />
            <Route path="/study/:documentId" element={<StudySession />} />
            <Route path="/learning-style" element={<LearningStyle />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/verification" element={<Verification />} />
          </Routes>
        </main>

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-textSecondary md:flex-row">
            <span>EduMind · Didattica intelligente per ITIS</span>
            <div className="flex items-center gap-4">
              <span>AI personalizzata</span>
              <span>Gamification</span>
              <span>Mobile-first</span>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
