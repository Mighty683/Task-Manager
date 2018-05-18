function ServerController (DBClient) {
  this.DBClient = DBClient
  this.updateDoc = function (callback) {
    this.DBClient.collection('usersTasks', (err, collection) => {
      if (!err) {
        if (collection) {
          collection.find({user: 'admin'}, (err, prevDoc) => {
            if (!err) {
              prevDoc.toArray((err, docContent) => {
                if (!err) {
                  callback(collection, docContent[0])
                }
              })
            }
          })
        }
      }
    })
  }
  this.add = function (req, res) {
    console.log('ADD:NEW')
    this.updateDoc(function (collection, docContent) {
      let prevTasks = docContent.tasks
      prevTasks.push({id: prevTasks[prevTasks.length - 1].id + 1, when: new Date()})
      collection.update({user: 'admin'}, {
        user: 'admin',
        tasks: prevTasks
      }, (err, newDoc) => {
        if (!err) {
          res.send(prevTasks)
        }
      })
    })
  }
  this.getAll = function (req, res) {
    console.log('GET:ALL')
    this.DBClient.collection('usersTasks', (err, collection) => {
      if (!err) {
        if (collection) {
          collection.find({user: 'admin'}, (err, doc) => {
            if (!err) {
              doc.toArray((err, doc) => {
                if (!err) {
                  res.send(doc[0].tasks)
                }
              })
            }
          })
        }
      }
    })
  }
  this.edit = function (req, res) {
    console.log(`edit:${req.body.id}`)
    this.updateDoc(function (collection, docContent) {
      let prevTasks = docContent.tasks
      let indexToEdit = prevTasks.indexOf((task) => task.id === req.body.id)
      prevTasks[indexToEdit] = req.body
      console.log(docContent.tasks)
      collection.update({user: 'admin'}, {
        user: 'admin',
        tasks: prevTasks
      }, (err, newDoc) => {
        if (!err) {
          res.send(newDoc)
        }
      })
    })
  }
}

module.exports = ServerController
