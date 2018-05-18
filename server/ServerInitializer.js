const express = require('express')
const ServerController = require('./ServerController.js')
const app = express()
var bodyParser = require('body-parser')
function InitializeServer (DBCollection) {
  let serverController = new ServerController(DBCollection)
  app.use(bodyParser.json())
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.post('/add', function (req, res) {
    serverController.add(req, res)
  })

  app.post('/edit', function (req, res) {
    serverController.edit(req, res)
  })

  app.get('/get/all', function (req, res) {
    serverController.getAll(req, res)
  })
  app.post('/delete', function (req, res) {
    serverController.delete(req, res)
  })

  app.listen(15432, function () {
    console.log('Listening 15432 port')
  })
}

module.exports = InitializeServer
