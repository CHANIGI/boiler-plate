'use strict'

const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const {User} = require('./models/User')
const bodyParser = require('body-parser')
const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())

mongoose.connect(config.mongoURI,{useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))
mongoose.set('strictQuery', false)

app.get('/', (req, res) => res.send('Hello  world'))

app.post('/register', (req, res) => {
  //회원 가입시 필요한 정보들을 client에서 가져오면
  //database에 넣어주기
  const user = new User(req.body)

  user.save((err, userinfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => console.log(`Example app listening in port${port}`))