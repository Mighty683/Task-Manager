const express = require('express')
const app = express()
var bodyParser = require('body-parser')
function InitializeServer (dbConnection) {
  app.use(bodyParser.json())
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
  app.post('/edit', function (req, res) {
    console.log(`edit:${req.body.id}`)
    dbConnection.toArray((err, docs) => {
      if (!err) {
        let doc = docs[0]
        let item = doc.find(
          (task) => task.id === req.body.id)
        item = req.body
        res.send({
          task: item
        })
      }
    })
  })

  app.get('/get/all', function (req, res) {
    console.log('GET:ALL')
    dbConnection.toArray((err, docs) => {
      console.log(`get:all:${docs[0].user}:tasks`)
      if (!err) {
        res.send(docs[0].tasks)
      }
    })
  })
  app.post('/delete', function (req, res) {
    res.send()
  })

  app.post('/add', function (req, res) {
    res.send()
  })

  app.listen(8000, function () {
    console.log('Listening 8000 port')
  })
}

module.exports = InitializeServer
