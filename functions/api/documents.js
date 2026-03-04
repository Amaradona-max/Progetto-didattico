
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Vercel non gestisce nativamente il parsing di multipart/form-data
    // quindi dobbiamo leggerlo manualmente.
    // Questa è una semplificazione e potrebbe non gestire file di grandi dimensioni.
    const formidable = await import('formidable');
    const form = formidable.default({});

    const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(request, (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve([fields, files]);
        });
    });

    const subjectId = fields.subjectId[0];
    const title = fields.title[0];
    const uploadedFiles = files.documents;

    // Simuliamo una risposta di successo per ogni file caricato
    const simulatedDocuments = (Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles]).map(file => ({
        id: `simulated_${Date.now()}`,
        title: title || 'Senza titolo',
        fileName: file.originalFilename,
    }));

    return response.status(200).json({ success: true, documents: simulatedDocuments });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
