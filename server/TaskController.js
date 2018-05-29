function TaskController (UsersCollection, TasksCollection) {
  this.UsersCollection = UsersCollection
  this.TasksCollection = TasksCollection

  this.getUser = function (query, callback) {
    this.UsersCollection.find(query, (err, userDoc) => {
      if (!err) {
        userDoc.toArray((err, userDocContent) => {
          if (!err && userDocContent[0]) {
            callback(userDocContent[0])
          } else {
            callback(null)
          }
        })
      } else {
        callback(null)
      }
    })
  }

  this.updateDoc = function (query, callback) {
    this.getUser(query, function (userDocContent) {
      if (userDocContent) {
        let user = userDocContent.user
        this.TasksCollection.find({user: user}, (err, prevDoc) => {
          if (!err) {
            prevDoc.toArray((err, docContent) => {
              if (!err) {
                callback(user, docContent[0])
              }
            })
          }
        })
      } else {
        callback(null)
      }
    }.bind(this))
  }

  this.add = function (req, res) {
    console.log('ADD:NEW')
    this.updateDoc({token: req.body.token}, function (user, docContent) {
      if (docContent) {
        let prevTasks = docContent.tasks
        let id = prevTasks[prevTasks.length - 1] ? prevTasks[prevTasks.length - 1].id + 1 : 0
        prevTasks.push({id: id, when: new Date()})
        this.TasksCollection.update({user: user}, {
          user: user,
          tasks: prevTasks
        }, (err, newDoc) => {
          if (!err) {
            res.send(prevTasks)
          }
        })
      } else {
        res.sendStatus(401)
      }
    }.bind(this))
  }

  this.delete = function (req, res) {
    console.log(`delete:${req.body.id}`)
    this.updateDoc({token: req.body.token}, function (user, docContent) {
      if (docContent) {
        let prevTasks = docContent.tasks
        let indexToRemove = prevTasks.findIndex((task) => task.id === req.body.id)
        console.log(indexToRemove)
        if (indexToRemove >= 0) {
          prevTasks.splice(indexToRemove, 1)
        }
        this.TasksCollection.update({user: user}, {
          user: user,
          tasks: prevTasks
        }, (err, newDoc) => {
          if (!err) {
            res.send(prevTasks)
          }
        })
      } else {
        res.sendStatus(401)
      }
    }.bind(this))
  }
  this.getAll = function (req, res) {
    console.log('GET:ALL')
    this.getUser({token: req.body.token}, function (userDocContent) {
      if (userDocContent) {
        this.TasksCollection.find({user: userDocContent.user}, (err, doc) => {
          if (!err) {
            doc.toArray((err, doc) => {
              if (!err) {
                res.send(doc[0].tasks)
              } else {
                res.sendStatus(500)
              }
            })
          }
        })
      } else {
        res.sendStatus(401)
      }
    }.bind(this))
  }
  this.edit = function (req, res) {
    console.log(`edit:${req.body.id}`)
    this.updateDoc({token: req.body.token}, function (user, docContent) {
      if (docContent) {
        let prevTasks = docContent.tasks
        let indexToEdit = prevTasks.findIndex((task) => task.id === req.body.id)
        prevTasks[indexToEdit] = req.body
        this.TasksCollection.update({user: user}, {
          user: user,
          tasks: prevTasks
        }, (err, newDoc) => {
          if (!err) {
            res.send(prevTasks[indexToEdit])
          }
        })
      } else {
        res.sendStatus(401)
      }
    }.bind(this))
  }
}

module.exports = TaskController
