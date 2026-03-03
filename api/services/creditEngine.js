const CREDIT_ACTIONS = {
  COMPLETE_LEARNING_STYLE_TEST: 50,
  FIRST_QUESTION_PER_SESSION: 5,
  QUESTION_QUALITY_BONUS: (score) => score * 2,
  COMPLETE_STUDY_SESSION: 20,
  PASS_VERIFICATION_QUIZ: 100,
  DAILY_STREAK_BONUS: 15,
  HELP_CLASSMATE: 30,
}

const awardCredits = (action, payload = {}) => {
  if (action === 'QUESTION_QUALITY_BONUS') {
    return CREDIT_ACTIONS.QUESTION_QUALITY_BONUS(payload.score || 0)
  }
  return CREDIT_ACTIONS[action] || 0
}

module.exports = { awardCredits, CREDIT_ACTIONS }
