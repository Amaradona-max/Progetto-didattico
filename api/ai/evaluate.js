import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { question, context } = request.body;

    if (!question || !context) {
      return response.status(400).json({ error: 'Question and context are required.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `Contesto: ${context}\n\nDomanda: ${question}`;

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const answer = aiResponse.text();

    return response.status(200).json({
      answer: answer,
      feedback: 'Risposta generata da Gemini.',
      quality_score: 4, // Esempio
      credits_earned: 15, // Esempio
    });

  } catch (error) {
    console.error("Error calling Gemini:", error);
    return response.status(500).json({ error: error.message });
  }
}
