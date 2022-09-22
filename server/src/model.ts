import mongoose, { Schema } from 'mongoose'

const bidSchema = new Schema({
  bidRows: {
    type: Map,
    of: String
  }
})

export default mongoose.model('Bid', bidSchema)
