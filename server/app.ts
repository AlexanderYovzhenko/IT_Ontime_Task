import express, { Express } from 'express'
import bodyParser from 'body-parser'
import routes from './src/routes'

export const app: Express = express()

app.use(bodyParser.json())

app.use('', routes)
