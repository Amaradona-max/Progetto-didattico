export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { question, context } = request.body;

    // Logica AI simulata
    const simulatedAnswer = `Risposta simulata per la domanda: "${question}". Contesto fornito: "${context.substring(0, 50)}..."`;

    return response.status(200).json({
      answer: simulatedAnswer,
      feedback: 'Questa è una risposta simulata. La logica AI reale deve essere implementata.',
      quality_score: 3,
      credits_earned: 10,
    });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}