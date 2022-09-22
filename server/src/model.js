const { mongoose } = require('../server')

const bidSchema = new mongoose.Schema({
  name:  String,
  description: String,
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Bid', bidSchema)
