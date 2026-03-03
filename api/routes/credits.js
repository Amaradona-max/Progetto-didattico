const express = require('express')
const { awardCredits } = require('../services/creditEngine')

const router = express.Router()

router.post('/award', (req, res) => {
  const { action, payload } = req.body
  const credits = awardCredits(action, payload)
  res.json({ credits })
})

module.exports = router
