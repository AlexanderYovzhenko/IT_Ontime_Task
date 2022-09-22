const Bid = require('./model')

const getBids = async() => {
  const bids = await Bid.find({})
  return bids
}

const postBid = async(newBid) => {
  const bid = await Bid.create(newBid)
  return bid
}

const putBid = async(id, newBid) => {
  const updateBid = await Bid.update({ id }, { ...newBid })
  return updateBid
}

const deleteBid = async(id) => {
  const removeBid = await Bid.findOne({ id }).exec()
  await removeBid.remove()
}

module.exports = {
  getBids,
  postBid,
  putBid,
  deleteBid
}
