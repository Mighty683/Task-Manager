const DbInitializer = require('./DBInitializer.js')
const ServerInitializer = require('./ServerInitializer.js')
const hashFun = require('./helpers/hashFun.js')

var today = new Date()
var initialState = [{
  user: 'admin',
  pass: hashFun('admin'),
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
  ]},
{
  user: 'user',
  pass: hashFun('user'),
  tasks: [{
    id: 1,
    name: 'Task 1',
    desc: 'Description',
    where: 'Place',
    done: true,
    when: new Date(today.getTime() - 1000000)
  }
  ]}]
let dbInitializer = new DbInitializer()
dbInitializer.on('db:init', (dbclient) => {
  console.log('Server Initialization')
  ServerInitializer(dbclient)
})
dbInitializer.initDB(initialState)
