const express = require('express')
const multer = require('multer')
const { extractText, chunkText } = require('../services/documentParser')
const { addDocuments, listDocuments, getContext } = require('../services/documentStore')

const router = express.Router()
const upload = multer()

router.post(
  '/upload',
  upload.fields([
    { name: 'documents', maxCount: 20 },
    { name: 'document', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log('Ricevuta richiesta di upload...');
      const { subjectId, title, description } = req.body
      console.log('Payload:', { subjectId, title, description });
      
      const files = [
        ...((req.files && req.files.documents) || []),
        ...((req.files && req.files.document) || []),
      ]
      
      console.log('File ricevuti:', files.length);

      if (!subjectId) {
        console.log('Errore: Materia mancante');
        return res.status(400).json({ error: 'Materia mancante' })
      }

      if (!files.length) {
        console.log('Errore: Documenti mancanti');
        return res.status(400).json({ error: 'Documenti mancanti' })
      }

      const baseTimestamp = Date.now()
      const documents = await Promise.all(
        files.map(async (file, index) => {
          console.log(`Elaborazione file ${index + 1}: ${file.originalname}`);
          const text = await extractText(file.buffer, file.mimetype)
          const chunks = chunkText(text, 2000)
          const computedTitle = title
            ? `${title}${files.length > 1 ? ` (${index + 1})` : ''}`
            : file.originalname
          return {
            id: `${baseTimestamp}-${index + 1}`,
            subjectId,
            title: computedTitle,
            description,
            chunks,
            fileName: file.originalname,
            createdAt: new Date().toISOString(),
          }
        })
      )

      console.log('Salvataggio documenti in corso...');
      await addDocuments(documents);
      console.log('Upload completato con successo!');

      res.json({
        success: true,
        documents,
      });
    } catch (error) {
      console.error('ERRORE CRITICO DURANTE L\'UPLOAD:', error);
      res.status(500).json({ 
        error: 'Errore interno durante il caricamento.',
        details: error.message 
      });
    }
  }
);

router.get('/', async (req, res) => {
  const { subjectId } = req.query;
  const documents = await listDocuments({ subjectId });
  res.json({ documents });
});

router.get('/context', async (req, res) => {
  const { subjectId, documentId } = req.query;
  const context = await getContext({ subjectId, documentId });
  res.json({ context });
});

module.exports = router
