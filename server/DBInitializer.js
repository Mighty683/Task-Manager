const MongoClient = require('mongodb').MongoClient
const util = require('util')
const EventEmitter = require('events').EventEmitter

function DBController () {
  this.initDB = function (initialState) {
    this.on('db:connected', (client) => {
      this.on('collection:users:set', collection => {
        let defaultUser = {
          user: 'admin',
          password: 'admin'
        }
        this.on(`DB:user:${defaultUser.user}:doc:created`, function (docConnection) {
          this.emit('db:init', client)
        })
        this.checkAndCreateDoc(collection, defaultUser, { user: defaultUser.user }, `user:${defaultUser.user}`)
      })
      this.on('collection:usersTasks:set', (collection) => {
        this.on(`DB:taskList:${initialState.user}:doc:created`, function (docConnection) {
          this.createCollection(client.db('taskManager'), 'users')
        })
        this.checkAndCreateDoc(collection, initialState, { user: initialState.user }, `taskList:${initialState.user}`)
      })
      this.createCollection(client.db('taskManager'), 'usersTasks')
    })
    this.connectDB()
  }
  this.connectDB = function () {
    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
      if (!err) {
        this.emit('db:connected', client)
        console.log(`DB connection: ${'mongodb://127.0.0.1:27017'}`)
      } else {
        console.log(err)
      }
    })
  }

  this.checkAndCreateDoc = function (collection, data, query, name) {
    collection.find(query).next((err, doc) => {
      if (!err) {
        if (doc) {
          console.log(`DB:${name}:doc:exists`)
          this.emit(`DB:${name}:doc:created`, collection.find(query))
        } else {
          console.log(`DB:${name}:doc:created`)
          collection.insertOne(data, (err, doc) => {
            if (!err) {
              this.emit(`DB:${name}:doc:created`, collection.find(query))
            }
          })
        }
      } else {
        console.log('Doc access error!')
      }
    })
  }

  this.createCollection = function (db, name) {
    db.collection(name, (err, collection) => {
      if (!err) {
        if (!collection) {
          db.createCollection(name, (err, res) => {
            if (!err) {
              this.emit('collection:set', res)
              console.log('Collection channels created!')
            }
          })
        } else {
          this.emit(`collection:${name}:set`, collection)
          console.log('Collection already exists!')
        }
      } else {
        console.log(err)
      }
    })
  }
}

util.inherits(DBController, EventEmitter)
module.exports = DBController
