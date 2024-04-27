const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'role'}]
})

module.exports = User = mongoose.model('user', userScheme)