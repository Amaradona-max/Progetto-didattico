const express = require('express')

const router = express.Router()

router.post('/login', (req, res) => {
  const { email } = req.body
  res.json({ token: 'demo-token', user: { email, role: 'student' } })
})

router.post('/register', (req, res) => {
  const { email, name, role } = req.body
  res.json({ token: 'demo-token', user: { email, name, role } })
})

module.exports = router
