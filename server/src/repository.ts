import Bid from './model'

interface  IBid {
  [x: string]: string | undefined
}


const getBids = async() => {
  const bids = await Bid.find({})
  return bids
}

const postBid = async(newBid: IBid) => {
  const bid = await Bid.create({bidRows: {
    ...newBid
  }})
  return bid
}

const putBid = async(id: string, newBid: IBid) => {
  const updateBid = await Bid.updateOne({ _id: id }, { bidRows: {
    ...newBid
  } })
  return updateBid
}

const deleteBid = async(id: string) => {
  const removeBid = await Bid.findOne({ _id: id }).exec()
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
