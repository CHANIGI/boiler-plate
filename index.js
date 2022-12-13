'use strict'

const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const {User} = require('./models/User')
const bodyParser = require('body-parser')
const config = require('./config/key')
const cookieParser = require('cookie-parser')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())
app.use(cookieParser())

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
app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾음
  User.findOne({email:req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
      
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
      return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err)
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userID: user._id})
      })
    })
  })
})

app.listen(port, () => console.log(`Example app listening in port${port}`))