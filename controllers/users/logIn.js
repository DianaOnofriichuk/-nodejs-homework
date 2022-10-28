const { User, userLogInJoiSchema } = require('../../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const LogIn = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  const comparePassword = bcrypt.compareSync(password, user.password)

  const { error } = userLogInJoiSchema.validate(req.body)
  if (error) {
    error.status = 400
    throw error
  }
  if (!user || !comparePassword) {
    const error = new Error('Email or password is wrong')
    error.status = 401
    throw error
  }
  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' })
  await User.findByIdAndUpdate(user._id, { token })
  await res.json({ status: 'succsess', code: 200, data: token })
}
module.exports = LogIn
