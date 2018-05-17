const express = require('express')
const app = express()
var bodyParser = require('body-parser')
function InitializeServer (DBClient) {
  app.use(bodyParser.json())
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.post('/add', function (req, res) {
    console.log('ADD:TASK')
    DBClient.collection('usersTasks', (err, collection) => {
      if (!err) {
        if (collection) {
          collection.find({user: 'admin'}, (err, prevDoc) => {
            if (!err) {
              prevDoc.toArray((err, docContent) => {
                if (!err) {
                  docContent[0].tasks.push({when: new Date()})
                  console.log(docContent[0].tasks)
                  collection.update({user: 'admin'}, {
                    user: 'admin',
                    tasks: docContent[0].tasks
                  }, (err, newDoc) => {
                    if (!err) {
                      res.send(newDoc)
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  })

  app.post('/edit', function (req, res) {
    console.log(`edit:${req.body.id}`)
    DBClient.collection('usersTasks', (err, collection) => {
      if (!err) {
        if (collection) {
          collection.update({user: 'admin'}, {
            user: 'admin',
            tasks: req.body
          }, (err, doc) => {
            if (!err) {
              res.send(doc)
            }
          })
        }
      }
    })
  })

  app.get('/get/all', function (req, res) {
    console.log('GET:ALL')
    DBClient.collection('usersTasks', (err, collection) => {
      if (!err) {
        if (collection) {
          collection.find({user: 'admin'}, (err, doc) => {
            if (!err) {
              doc.toArray((err, doc) => {
                if (!err) {
                  console.log(doc[0].tasks)
                  res.send(doc[0].tasks)
                }
              })
            }
          })
        }
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
