const mongoose = require('mongoose')

const roleScheme = new mongoose.Schema({
  value: {type: String, default: 'user'}
})

module.exports = Role = mongoose.model('role', roleScheme)