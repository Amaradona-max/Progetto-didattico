import { create } from 'zustand'

const loadQuestions = () => {
  try {
    const raw = localStorage.getItem('edumind_questions')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const useUserStore = create((set) => ({
  user: {
    name: 'Luca Romano',
    role: 'studente',
    learningStyle: 'visual',
  },
  questions: loadQuestions(),
  setLearningStyle: (learningStyle) =>
    set((state) => ({
      user: { ...state.user, learningStyle },
    })),
  addQuestion: (question) =>
    set((state) => {
      const nextQuestions = [question, ...state.questions].slice(0, 50)
      localStorage.setItem('edumind_questions', JSON.stringify(nextQuestions))
      return { questions: nextQuestions }
    }),
}))

export default useUserStore
