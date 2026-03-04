export default function useAI() {
  const apiBase = ''

  const ask = async (question, context) => {
    const response = await fetch(`${apiBase}/api/ai/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context }),
    })
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Errore durante la risposta AI.')
    }
    return response.json()
  }

  return { ask }
}
