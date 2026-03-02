require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const documentRoutes = require('./routes/documents')
const aiRoutes = require('./routes/ai')
const studentRoutes = require('./routes/students')
const creditRoutes = require('./routes/credits')

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/documents', documentRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/credits', creditRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`EduMind backend listening on port ${port}`)
})
