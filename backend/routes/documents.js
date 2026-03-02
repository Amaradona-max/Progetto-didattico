const express = require('express')
const multer = require('multer')
const { extractText, chunkText } = require('../services/documentParser')

const router = express.Router()
const upload = multer()

router.post('/upload', upload.single('document'), async (req, res) => {
  const { subjectId, title, description } = req.body
  const fileBuffer = req.file ? req.file.buffer : null

  if (!fileBuffer) {
    return res.status(400).json({ error: 'Documento mancante' })
  }

  const text = await extractText(fileBuffer, req.file.mimetype)
  const chunks = chunkText(text, 2000)

  res.json({
    success: true,
    document: {
      id: 'demo-doc',
      subjectId,
      title,
      description,
      chunks,
      fileName: req.file.originalname,
    },
  })
})

router.get('/', (req, res) => {
  res.json({ documents: [] })
})

module.exports = router
