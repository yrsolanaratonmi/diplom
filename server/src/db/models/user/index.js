const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = User = mongoose.model('user', userScheme)