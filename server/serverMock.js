const DbConstroller = require('./dbController.js')
const ServerInitializer = require('./ServerInitializer.js')

var today = new Date()
var initialState = {
  user: 'admin',
  tasks: [{
    id: 1,
    name: 'Task 1',
    desc: 'Description',
    where: 'Place',
    done: true,
    when: new Date(today.getTime() - 1000000)
  },
  {
    id: 2,
    name: 'Task 2',
    desc: 'Description',
    where: 'Place',
    done: false,
    when: undefined
  },
  {
    id: 3,
    name: 'Task 3',
    desc: 'Description',
    where: 'Place',
    done: false,
    when: new Date(today.getTime() + 1000000)
  }
  ]}
let dbController = new DbConstroller()

dbController.on('db:connected', (client) => {
  dbController.on('collection:set', (collection) => {
    dbController.on(`DB:${initialState.user}:doc:created`, function (docConnection) {
      ServerInitializer(docConnection)
    })
    dbController.checkAndCreateDoc(collection, initialState, { user: initialState.user }, initialState.user)
  })
  dbController.createCollection(client.db('taskManager'), 'usersTasks')
})
dbController.connectDB()
