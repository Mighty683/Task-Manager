function ServerController (DBCollection) {
  this.DBCollection = DBCollection
  this.updateDoc = function (callback) {
    this.DBCollection.find({user: 'admin'}, (err, prevDoc) => {
      if (!err) {
        prevDoc.toArray((err, docContent) => {
          if (!err) {
            callback(docContent[0])
          }
        })
      }
    })
  }
  this.add = function (req, res) {
    console.log('ADD:NEW')
    this.updateDoc(function (docContent) {
      let prevTasks = docContent.tasks
      prevTasks.push({id: prevTasks[prevTasks.length - 1].id + 1, when: new Date()})
      this.DBCollection.update({user: 'admin'}, {
        user: 'admin',
        tasks: prevTasks
      }, (err, newDoc) => {
        if (!err) {
          res.send(prevTasks)
        }
      })
    }.bind(this))
  }

  this.delete = function (req, res) {
    console.log(`delete:${req.body.id}`)
    this.updateDoc(function (docContent) {
      let prevTasks = docContent.tasks
      let indexToRemove = prevTasks.findIndex((task) => task.id === req.body.id)
      prevTasks.splice(indexToRemove, 1)
      this.DBCollection.update({user: 'admin'}, {
        user: 'admin',
        tasks: prevTasks
      }, (err, newDoc) => {
        if (!err) {
          res.send(prevTasks)
        }
      })
    }.bind(this))
  }
  this.getAll = function (req, res) {
    console.log('GET:ALL')
    this.DBCollection.find({user: 'admin'}, (err, doc) => {
      if (!err) {
        doc.toArray((err, doc) => {
          if (!err) {
            res.send(doc[0].tasks)
          }
        })
      }
    })
  }
  this.edit = function (req, res) {
    console.log(`edit:${req.body.id}`)
    this.updateDoc(function (docContent) {
      let prevTasks = docContent.tasks
      let indexToEdit = prevTasks.findIndex((task) => task.id === req.body.id)
      prevTasks[indexToEdit] = req.body
      this.DBCollection.update({user: 'admin'}, {
        user: 'admin',
        tasks: prevTasks
      }, (err, newDoc) => {
        if (!err) {
          res.send(prevTasks[indexToEdit])
        }
      })
    }.bind(this))
  }
}

module.exports = ServerController
