'use strict'

const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://CHANIGI:cksdlr6365!@cluster0.vb3ol2i.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))
mongoose.set('strictQuery', false)

app.get('/', (req, res) => res.send('Hello  world'))

app.listen(port, () => console.log(`Example app listening in port${port}`))