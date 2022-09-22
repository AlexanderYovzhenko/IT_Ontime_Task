import mongoose, { Schema } from 'mongoose'

const bidSchema = new Schema({
  name:  String,
  description: String,
  date: { type: Date, default: Date.now },
})

export default mongoose.model('Bid', bidSchema)
