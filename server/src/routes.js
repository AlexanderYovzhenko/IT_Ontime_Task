const express = require('express')
const repository = require('./repository')

const router = express.Router()

router.get('/', (_, res) => {
  res.status(200).send('Home page!')
})

router.get('/bids', async(req, res) => {
  const bids = await repository.getBids()
  res.status(200).send(bids)
})
router.post('/bids', async(req, res) => {
  const bid = await repository.postBid(req.body)
  res.status(201).send(bid)
})
router.put('/bids', async(req, res) => {
  const id = req.query.id
  const updateBid = await repository.putBid(id, req.body)
  res.status(201).send(updateBid)
})
router.delete('/bids', async(req, res) => {
  const id = req.query.id
  await repository.deleteBid(id)
  res.status(204).send()
})

router.get('/*', (_, res) => {
  res.status(404).send('Page not found!')
})

module.exports = router
