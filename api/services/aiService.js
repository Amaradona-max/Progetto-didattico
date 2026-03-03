const buildPrompt = (question, context) => {
  if (context) {
    return `Contesto documento: ${context}\nDomanda: ${question}\nRispondi in italiano in modo chiaro e corretto.`
  }
  return `Domanda: ${question}\nRispondi in italiano in modo chiaro e corretto.`
}

const formatError = (message) => ({
  quality_score: 1,
  credits_earned: 0,
  feedback: message,
  answer: message,
})

const callAnthropic = async (question, context) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return formatError('Chiave API Claude mancante nel backend.')
  }
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620'
  const prompt = buildPrompt(question, context)
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
    return formatError(message)
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

const callOpenRouter = async (question, context) => {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return formatError('Chiave API OpenRouter mancante nel backend.')
  }
  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'
  const prompt = buildPrompt(question, context)
  const headers = {
    'content-type': 'application/json',
    authorization: `Bearer ${apiKey}`,
  }
  if (process.env.OPENROUTER_SITE) {
    headers['HTTP-Referer'] = process.env.OPENROUTER_SITE
  }
  if (process.env.OPENROUTER_TITLE) {
    headers['X-Title'] = process.env.OPENROUTER_TITLE
  }
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      max_tokens: 512,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const message = error?.error?.message || 'Errore durante la chiamata a OpenRouter.'
    return formatError(message)
  }
  const data = await response.json()
  const answerText = data?.choices?.[0]?.message?.content?.trim() || ''
  return {
    quality_score: 4,
    credits_earned: 7,
    feedback: 'Risposta generata correttamente.',
    answer: answerText || 'Non ho trovato una risposta.',
  }
}

const evaluateQuestion = async (question, context) => {
  const provider = (process.env.AI_PROVIDER || '').toLowerCase()
  const hasOpenRouterKey = Boolean(process.env.OPENROUTER_API_KEY || process.env.ANTHROPIC_API_KEY)
  if (provider === 'openrouter' || (!provider && hasOpenRouterKey)) {
    return callOpenRouter(question, context)
  }
  return callAnthropic(question, context)
}

module.exports = { evaluateQuestion }
