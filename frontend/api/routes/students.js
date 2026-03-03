const express = require('express')

const router = express.Router()

router.get('/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Luca Romano',
    learningStyle: 'visual',
    credits: 320,
  })
})

router.put('/:id/learning-style', (req, res) => {
  const { learningStyle } = req.body
  res.json({ id: req.params.id, learningStyle })
})

module.exports = router
