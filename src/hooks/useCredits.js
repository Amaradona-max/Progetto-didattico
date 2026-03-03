import useCreditsStore from '../store/useCreditsStore.js'

export default function useCredits() {
  const { totalCredits, dailyStreak, lastQualityScore, addCredits, setQualityScore } =
    useCreditsStore()

  return {
    totalCredits,
    dailyStreak,
    lastQualityScore,
    addCredits,
    setQualityScore,
  }
}
