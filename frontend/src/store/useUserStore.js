import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: {
    name: 'Luca Romano',
    role: 'studente',
    learningStyle: 'visual',
  },
  setLearningStyle: (learningStyle) =>
    set((state) => ({
      user: { ...state.user, learningStyle },
    })),
}))

export default useUserStore
