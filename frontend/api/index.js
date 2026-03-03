require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

const authRoutes = require('./routes/auth')
const aiRoutes = require('./routes/ai')
const studentRoutes = require('./routes/students')
const creditRoutes = require('./routes/credits')

// Configurazione di Multer per il salvataggio dei file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })
const app = express()

app.use(cors());
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', api: true })
})

// Rotta per l'upload dei file
app.post('/api/documents', upload.array('documents'), (req, res) => {
  // Qui il frontend si aspetta un array di "documents"
  const documents = req.files.map(f => ({
      id: f.filename,
      title: req.body.title || 'Senza titolo',
      fileName: f.originalname,
      // Aggiungi altri campi se necessario
  }));
  res.json({ message: 'File caricati con successo', documents: documents });
});

// Rotta per ottenere l'elenco dei file
app.get('/api/documents', (req, res) => {
  const dir = 'uploads/';
  if (!fs.existsSync(dir)) {
    return res.json({ documents: [] });
  }
  fs.readdir(dir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella lettura della cartella dei file.' });
    }
    const documents = files.map(file => ({
        id: file,
        title: file, // Semplificato, potremmo salvare metadati in un db.json
        fileName: file,
    }));
    res.json({ documents: documents });
  });
});

app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/credits', creditRoutes)

const port = process.env.PORT || 4000
if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`EduMind backend listening on port ${port}`)
  })
}

module.exports = app
