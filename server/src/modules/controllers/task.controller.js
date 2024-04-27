const Task = require('../../db/models/task/index')
const jwt = require('jsonwebtoken');
const user = require('../../db/models/user');

module.exports.getAllTasks = (req, res) => {
  const userId = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(userId, process.env.JWT_SECRET_KEY)
  try {
    Task.find({ userId: user.id }).then(result => {
      res.send(result)
    })
  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }
}

module.exports.createNewTask = (req, res) => {
  try {
    const userId = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(userId, process.env.JWT_SECRET_KEY);
    if (
      req.body.title &&
      typeof req.body.title === 'string') {
      const task = new Task({ title: req.body.title, description: req.body.description, created: req.body.created, userId: user.id })
      task.save()
        .then(result => res.send(result))
    } else res.status(400).send('uncorrected data')
  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }

}

module.exports.changeTaskInfo = (req, res) => {
  try {
    if (
      req.body.title &&
      typeof req.body.title === 'string') {
      Task.findByIdAndUpdate(req.body._id, { title: req.body.title, description: req.body.description, created: req.body.created })
        .then(result => res.send(result))
    } else res.status(400).send('uncorrected data')
  } catch (error) {
    res.status(500).send(`error : ${error}`)
  }


}

module.exports.deleteTask = (req, res) => {
  try {
    Task.findByIdAndDelete({ _id: req.query._id })
      .then(result => res.send(result))
  } catch (error) {
    res.status(500).send(`error : ${error}`)
  }

}