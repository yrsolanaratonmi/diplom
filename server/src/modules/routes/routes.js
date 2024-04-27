const express = require('express')
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const roleMiddleware = require('../../middlewares/roleMiddleware')



const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  deleteTask
} = require('../controllers/task.controller')

const {
  register,
  login,
  getUsers
} = require('../controllers/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/allUsers', authMiddleware, roleMiddleware(['admin']), getUsers)
router.get('/allTasks', authMiddleware, getAllTasks)
router.post('/task', authMiddleware, createNewTask)
router.patch('/task', authMiddleware, changeTaskInfo)
router.delete('/task', authMiddleware, deleteTask)
module.exports = router