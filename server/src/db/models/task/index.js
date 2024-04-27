const mongoose = require('mongoose')

const taskScheme = new mongoose.Schema({
  created: String,
  description: String,
  title: String,
  userId: String
})

module.exports = Task = mongoose.model('tasks', taskScheme)