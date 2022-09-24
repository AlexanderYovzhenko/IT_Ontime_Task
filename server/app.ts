import express, { Express } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './src/routes'

export const app: Express = express()

app.use(cors())

app.use(bodyParser.json())

app.use('', routes)
