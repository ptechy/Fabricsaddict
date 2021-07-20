
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './Routes/router'


import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



require('dotenv').config()

const uri = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }


//const uri     = `mongodb+srv://${env.LOGIN}:${env.PASSWORD}@${env.CLUSTER}.mongodb.net/${env.DATABASE}?retryWrites=true&w=majority`
//const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }

mongoose
  .connect(uri, options)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// EXPRESS JS
const app = express()
app.use(cors())
//app.use(bodyParser.json())
app.use(router)

app.listen(process.env.API_PORT, () => {
  console.log(`server is up and running on port ${process.env.API_PORT}`)
})
