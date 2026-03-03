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
    const { subjectId, title, description } = req.body
    const files = [
      ...((req.files && req.files.documents) || []),
      ...((req.files && req.files.document) || []),
    ]

    if (!subjectId) {
      return res.status(400).json({ error: 'Materia mancante' })
    }

    if (!files.length) {
      return res.status(400).json({ error: 'Documenti mancanti' })
    }

    const baseTimestamp = Date.now()
    const documents = await Promise.all(
      files.map(async (file, index) => {
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

    await addDocuments(documents);

    res.json({
      success: true,
      documents,
    });
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
