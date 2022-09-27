import { app } from './app'
import mongoose from 'mongoose'

const port = 3000
const uri = 'mongodb+srv://Goldem_Man:diMD2xwnxtSkU5Oi@cluster0.v5vgd6r.mongodb.net/?retryWrites=true&w=majority'

const start = async() => {
  try {
    await mongoose.connect(uri)
    app.listen(port, () => {
      console.info(`Server is running on port ${port}`)
    }) 
  } catch (error) {
    console.error(error)
  }
}

start()
