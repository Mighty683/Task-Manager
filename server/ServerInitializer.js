const express = require('express')
const TaskController = require('./TaskController.js')
const UserController = require('./UserController.js')

const app = express()
var bodyParser = require('body-parser')

function InitializeServer (DBClient) {
  app.use(bodyParser.json())
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  function Auth (callback, req, res) {
    DBClient.db('taskManager').collection('users', (err, collection) => {
      if (!err) {
        collection.find({token: req.body.token}, (err, doc) => {
          if (!err) {
            console.log('user:found')
            doc.toArray((err, data) => {
              if (!err && (data.length > 0)) {
                callback(req, res)
              } else {
                res.sendStatus(401)
              }
            })
          } else {
            res.sendStatus(401)
          }
        })
      } else {
        res.sendStatus(401)
      }
    })
  }

  function UserControllerInit () {
    DBClient.db('taskManager').collection('users', (err, collection) => {
      if (err) {
        throw err
      }
      console.log('UserControllerInit')
      let userController = new UserController(collection)
      app.post('/login', function (req, res) {
        userController.login(req, res)
      })

      app.post('/logout', Auth.bind(this, function (req, res) {
        userController.logout(req, res)
      }))
      TaskControllerInit.call(this)
    })
  }
  function TaskControllerInit () {
    DBClient.db('taskManager').collection('usersTasks', (err, collection) => {
      if (err) {
        throw err
      }
      console.log('TaskControllerInit')
      let taskController = new TaskController(collection)
      app.post('/add', Auth.bind(this, function (req, res) {
        taskController.add(req, res)
      }))

      app.post('/edit', Auth.bind(this, function (req, res) {
        taskController.edit(req, res)
      }))

      app.post('/get/all', Auth.bind(this, function (req, res) {
        taskController.getAll(req, res)
      }))
      app.post('/delete', Auth.bind(this, function (req, res) {
        taskController.delete(req, res)
      }))
      StartListen.call(this)
    })
  }
  function StartListen () {
    app.listen(15432, function () {
      console.log('Listening 15432 port')
    })
  }

  UserControllerInit()
}

module.exports = InitializeServer
