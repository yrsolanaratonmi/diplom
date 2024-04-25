const jwt = require("jsonwebtoken");
const User = require('../../db/models/user')

module.exports.register = (req, res) => {
  try {
    const authInfo = new User({username: req.body.username, password: req.body.password})
    authInfo.save().then(result => res.send(result))
  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }
}

module.exports.login = (req, res) => {

}