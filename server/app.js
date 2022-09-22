const express = require('express')
const app = express()
const port = 3000
const routes = require('./src/routes.js')

app.listen(port, () => {
  console.info(`Server is running on port ${port}`)
})

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something Broke!');
 })

app.use('', routes)
