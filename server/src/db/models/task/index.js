const mongoose = require('mongoose')

const taskScheme = new mongoose.Schema({
  text: String,
})

module.exports = Task = mongoose.model('tasks', taskScheme)