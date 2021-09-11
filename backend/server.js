
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './Routes/router'


import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



require('dotenv').config()

const uri = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
  .connect(uri, options)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// EXPRESS JS
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(router)


//app.use(express.json({limit: '20mb'}));
//app.use(express.urlencoded({ extended: false, limit: '20mb' }));


app.listen(process.env.API_PORT, () => {
  console.log(`server is up and running on port ${process.env.API_PORT}`)
})
