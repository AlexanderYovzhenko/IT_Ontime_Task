import Bid from './model'

interface  IBid {
  [x: string]: string | Date | undefined
}


const getBids = async() => {
  const bids = await Bid.find({})
  return bids
}

const postBid = async(newBid: IBid) => {
  const bid = await Bid.create(newBid)
  return bid
}

const putBid = async(id: string, newBid: IBid) => {
  const updateBid = await Bid.updateOne({ _id: id }, { ...newBid })
  return updateBid
}

const deleteBid = async(id: string) => {
  const removeBid = await Bid.findOne({ id }).exec()
  if(removeBid) {
    await removeBid.remove()
  }
}

export {
  getBids,
  postBid,
  putBid,
  deleteBid
}
