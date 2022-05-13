const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect('mongodb://localhost:27017/cyclades')

app.use(express.json())
app.use(cors())

const argonautes = mongoose.Schema({
  name: String
})

const Model = new mongoose.model('argonautes', argonautes)
const checkExist = (req, res, next) => {
  Model.find({ name: req.body.name }).then(data => {
    console.log(data);
    if (data.length > 0) {
      res.status(400).json('exist')
    }
    else { next() }
  })
}

app.get('/', (req, res) => {
  Model.find().then(data => {
    res.json(data)
  })
})


app.post('/', checkExist, (req, res) => {
  res.json('okk')
  console.log(req.body);
  const element = new Model({
    name: req.body.name
  })
  element.save()
})






app.listen(3007)