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
  `rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
    isActive 
    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20 scale-105' 
    : 'text-amber-900/60 hover:text-orange-600 hover:bg-orange-50'
  }`

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-[#451a03] selection:bg-orange-100">
        {/* Background Layer */}
        <div className="edu-background" />

        <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/60 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-2xl font-black text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                E
              </div>
              <div>
                <p className="text-xl font-black tracking-tight text-[#451a03]">EduMind</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600/80">Smart Tutor ITIS</p>
              </div>
            </div>
            <nav className="hidden items-center gap-2 md:flex">
              <NavLink to="/" className={linkClass}>Home</NavLink>
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
              <NavLink to="/teacher" className={linkClass}>Docenti</NavLink>
              <NavLink to="/credits" className={linkClass}>Crediti</NavLink>
            </nav>
            <div className="flex items-center gap-4">
               <button className="hidden md:block text-xs font-bold uppercase tracking-widest text-amber-900/40 hover:text-orange-600 transition-colors">Esci</button>
               <div className="h-10 w-10 rounded-full border-2 border-orange-200 bg-white p-0.5 overflow-hidden shadow-sm">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
               </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-6 py-12">
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

        <footer className="relative z-10 border-t border-orange-100 bg-white/40 py-12 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-lg font-bold text-[#451a03]">EduMind AI</p>
                <p className="max-w-xs text-sm text-amber-900/60">Didattica personalizzata con colori caldi per una migliore concentrazione.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-amber-900/40">
                <span className="hover:text-orange-600 transition-colors cursor-pointer">Privacy</span>
                <span className="hover:text-orange-600 transition-colors cursor-pointer">Guida</span>
                <span className="hover:text-orange-600 transition-colors cursor-pointer">Contatti</span>
              </div>
            </div>
            <div className="mt-12 text-center text-xs font-bold text-amber-900/20 uppercase tracking-widest">
              © 2024 EduMind · Made with 🧡 for Students
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
