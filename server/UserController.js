const crypto = require('crypto')

function UserController (DBCollection) {
  this.DBCollection = DBCollection

  this.updateDoc = function (user, callback) {
    this.DBCollection.find({user: user}, (err, prevDoc) => {
      if (!err) {
        prevDoc.toArray((err, docContent) => {
          if (!err && docContent.length > 0) {
            callback(docContent[0])
          } else {
            callback(null)
          }
        })
      } else {
        callback(null)
      }
    })
  }

  this.login = function (req, res) {
    let user = req.body.login
    let password = req.body.pass
    console.log(`login:${user}:user`)
    this.updateDoc(user, function (data) {
      if (data && (password === data.password)) {
        let dbToken = data.token
        if (data.token) {
          res.send({
            token: dbToken
          })
        } else {
          let newToken = crypto.randomBytes(20).toString('hex')
          this.DBCollection.update({user: user}, {
            user: data.user,
            password: data.password,
            token: newToken
          }, (err, newDoc) => {
            if (!err) {
              res.send({
                token: newToken
              })
            } else {
              throw err
            }
          })
        }
      } else {
        res.sendStatus(401)
      }
    }.bind(this))
  }

  this.logout = function (req, res) {
    // TODO
    console.log(`delete:${req.body.id}`)
    res.send(401)
  }
}
module.exports = UserController
