import express, { Request, Response, Router } from 'express'
import {
  getBids,
  postBid,
  putBid,
  deleteBid
} from './repository'

const router: Router = express.Router()

interface IQuery {
  id: string
}


router.get('/', (_: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.status(200).send('Home page!')
})

router.get('/bids', async(_: Request, res: Response) => {
  const bids = await getBids()
  res.header("Access-Control-Allow-Origin", "*")
  res.status(200).send(bids)
})
router.post('/bids', async(req: Request, res: Response) => {
  const bid = await postBid(req.body)
  res.header("Access-Control-Allow-Origin", "*")
  res.status(201).send(bid)
})
router.put('/bids', async(req: Request, res: Response) => {
  const { id } = req.query as unknown as IQuery
  const updateBid = await putBid(id, req.body)
  res.header("Access-Control-Allow-Origin", "*")
  res.status(201).send(updateBid)
})
router.delete('/bids', async(req: Request, res: Response) => {
  const { id } = req.query as unknown as IQuery
  await deleteBid(id)
  res.header("Access-Control-Allow-Origin", "*")
  res.status(204).send()
})

router.get('/*', (_: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.status(404).send('Page not found!')
})

export default router
