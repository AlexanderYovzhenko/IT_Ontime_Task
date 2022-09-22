const express = require('express')
const router = express.Router()

router.get('/', (_, res) => {
  res.status(200).send('Home page!')
})

router.get('/bids', (req, res) => {
  res.status(200).send('bids')
})
router.post('/bids', (req, res) => {
  res.status(201).send('bids')
})
router.put('/bids', (req, res) => {
  res.status(201).send('bids')
})
router.delete('/bids', (req, res) => {
  res.status(204).send('bids')
})

router.get('/*', (_, res) => {
  res.status(404).send('Page not found!')
})

module.exports = router
