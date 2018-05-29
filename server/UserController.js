const crypto = require('crypto')

function UserController (UsersCollection) {
  this.UsersCollection = UsersCollection

  this.updateDoc = function (query, callback) {
    this.UsersCollection.find(query, (err, prevDoc) => {
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

  this.updateToken = function (req, res, newToken) {
    let user = req.body.login
    let password = req.body.pass
    this.updateDoc({user: user}, function (data) {
      if (data && (password === data.password)) {
        let dbToken = data.token
        if (data.token) {
          res.send({
            token: dbToken
          })
        } else {
          this.UsersCollection.update({user: user}, {
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

  this.removeToken = function (req, res) {
    let token = req.body.token
    this.updateDoc({token: token}, function (data) {
      if (data) {
        this.UsersCollection.update({token: token}, {
          user: data.user,
          password: data.password,
          token: ''
        }, (err, newDoc) => {
          if (!err) {
            res.sendStatus(200)
          } else {
            throw err
          }
        })
      }
    }.bind(this))
  }

  this.login = function (req, res) {
    console.log(`login:${req.body.login}:user`)
    this.updateToken(req, res, crypto.randomBytes(20).toString('hex'))
  }

  this.logout = function (req, res) {
    console.log(`logout:${req.body.login}:user`)
    this.removeToken(req, res)
  }
}
module.exports = UserController
