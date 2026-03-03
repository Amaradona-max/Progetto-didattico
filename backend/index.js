require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const documentRoutes = require('./routes/documents')
const aiRoutes = require('./routes/ai')
const studentRoutes = require('./routes/students')
const creditRoutes = require('./routes/credits')

const app = express()
app.use(cors()); // Permette tutte le origini durante lo sviluppo per evitare problemi di fetch
app.use(express.json({ limit: '50mb' })) // Aumentato il limite per gestire file più grandi
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', api: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/documents', documentRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/credits', creditRoutes)

const port = process.env.PORT || 4000
if (require.main === module) {
  app.listen(port, () => {
    console.log(`EduMind backend listening on port ${port}`)
  })
}

module.exports = app
