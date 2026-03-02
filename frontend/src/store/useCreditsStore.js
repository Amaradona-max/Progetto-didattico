import { create } from 'zustand'

const useCreditsStore = create((set) => ({
  totalCredits: 320,
  dailyStreak: 5,
  lastQualityScore: 4,
  addCredits: (amount) =>
    set((state) => ({ totalCredits: state.totalCredits + amount })),
  setQualityScore: (score) => set({ lastQualityScore: score }),
}))

export default useCreditsStore
