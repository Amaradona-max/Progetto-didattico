const express = require('express')
const { evaluateQuestion } = require('../services/aiService')

const router = express.Router()

router.post('/evaluate', async (req, res) => {
  const { question, context } = req.body
  const result = await evaluateQuestion(question, context)
  res.json(result)
})

module.exports = router
