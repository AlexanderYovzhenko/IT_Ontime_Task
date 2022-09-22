const { app } = require('./server')
const routes = require('./src/routes')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something Broke!');
 })

app.use('', routes)
