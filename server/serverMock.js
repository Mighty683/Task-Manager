const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
var today = new Date()

const initialState = [
  {
    id: 1,
    name: 'Task 1',
    desc: 'Description',
    where: 'Place',
    when: new Date(today.getTime() - 1000000)
  },
  {
    id: 2,
    name: 'Task 2',
    desc: 'Description',
    where: 'Place',
    when: undefined
  },
  {
    id: 3,
    name: 'Task 3',
    desc: 'Description',
    where: 'Place',
    when: new Date(today.getTime() + 1000000)
  }
]

app.get('/get/all', function (req, res) {
  res.send(initialState)
})

app.listen(8000, function () {
  console.log('Listening 8000 port')
})
