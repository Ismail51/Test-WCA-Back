const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect('mongodb+srv://ismail51:Biloute1@cluster0.pyfql.mongodb.net/Cluster0?retryWrites=true&w=majority')

setInterval(() => {
  console.log(mongoose.connection.readyState);
}, 1000);
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





port = process.env.PORT || 80
console.log(port)
app.listen(port)