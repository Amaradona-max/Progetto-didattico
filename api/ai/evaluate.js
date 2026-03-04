import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { question, context } = request.body;

    if (!question || !context) {
      return response.status(400).json({ error: 'Question and context are required.' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Sei un assistente di studio. Rispondi alle domande basandoti esclusivamente sul contesto fornito. Sii conciso e preciso. Non usare informazioni esterne."
        },
        {
          role: "user",
          content: `Contesto: ${context}\n\nDomanda: ${question}`
        }
      ],
    });

    const answer = completion.choices[0].message.content;

    return response.status(200).json({
      answer: answer,
      feedback: 'Risposta generata da OpenAI.',
      quality_score: 4, // Esempio, potremmo calcolarlo in futuro
      credits_earned: 15, // Esempio
    });

  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return response.status(500).json({ error: error.message });
  }
}
