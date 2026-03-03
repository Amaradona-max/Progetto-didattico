const evaluateQuestion = async (question, context) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return {
      quality_score: 1,
      credits_earned: 0,
      feedback: 'Chiave API Claude mancante nel backend.',
      answer: 'Imposta ANTHROPIC_API_KEY nel file backend/.env per attivare l’AI.',
    }
  }
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620'
  const prompt = context
    ? `Contesto documento: ${context}\nDomanda: ${question}\nRispondi in italiano in modo chiaro e corretto.`
    : `Domanda: ${question}\nRispondi in italiano in modo chiaro e corretto.`
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 512,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const message = error?.error?.message || 'Errore durante la chiamata a Claude.'
    return {
      quality_score: 1,
      credits_earned: 0,
      feedback: message,
      answer: message,
    }
  }
  const data = await response.json()
  const answerText = Array.isArray(data.content)
    ? data.content.map((item) => item.text || '').join('\n').trim()
    : ''
  return {
    quality_score: 4,
    credits_earned: 7,
    feedback: 'Risposta generata correttamente.',
    answer: answerText || 'Non ho trovato una risposta.',
  }
}

module.exports = { evaluateQuestion }
