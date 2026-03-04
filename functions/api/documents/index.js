// GET /api/documents

export async function onRequestGet(context) {
  const { env } = context;

  try {
    // Qui andrebbe la logica per ottenere l'elenco dei file da Supabase
    // Per ora, simuliamo una risposta con un array vuoto

    return new Response(JSON.stringify({ documents: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
