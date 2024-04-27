const jwt = require("jsonwebtoken");
const User = require('../../db/models/user')
const Role = require('../../db/models/role')
const bcrypt = require('bcryptjs')

module.exports.register = async (req, res) => {
  try {
    const { username, password } = req.body
    const candidate = await User.findOne({ username });
    if (!!candidate) {
      res.status(400).send({ message: 'Username with this name already exists' })
    } else {
      const userRole = await Role.findOne({ value: 'user' })
      const hashPassword = bcrypt.hashSync(password, 8)
      const user = new User({ username, password: hashPassword, roles: [userRole.value] });
      await user.save()
      return res.json({ message: "user registered successfully" })
    }

  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }
}

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send({ message: `user ${username} doesnt exist` });

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) return res.status(400).send({ message: `password is not correct` });

  const token = generateAccessToken(user._id, user.roles);
  return res.send({ token })
}

module.exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users)
}



function generateAccessToken(id, roles) {
  const payload = { id, roles };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
}