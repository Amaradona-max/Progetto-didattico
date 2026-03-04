// POST /api/documents/upload
// Multipart form-data: file + metadata

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const file = formData.get('documents'); // Il campo FormData è 'documents'
    const subjectId = formData.get('subjectId');
    const title = formData.get('title');

    // Qui andrebbe la logica di upload su un servizio di storage (es. Supabase o R2)
    // Per ora, simuliamo una risposta di successo
    // In un secondo momento, integreremo Supabase come da guida

    const simulatedDocument = {
        id: `simulated_${Date.now()}`,
        title: title || 'Senza titolo',
        fileName: file.name,
    };

    return new Response(JSON.stringify({ success: true, documents: [simulatedDocument] }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
