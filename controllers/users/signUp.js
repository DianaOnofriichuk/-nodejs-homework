const { User, userSignUpJoiSchema } = require('../../models/users')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const signUp = async (req, res) => {
  const { name, email, password, subscription = 'starter' } = req.body
  const user = await User.findOne({ email })
  const { error } = userSignUpJoiSchema.validate(req.body)
  if (error) {
    error.status = 400
    throw error
  }
  if (user) {
    const error = new Error('Email in use')
    error.status = 409
    throw error
  }

  const avatarURL = gravatar.url(email)
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    subscription,
  })

  res.status(201).json({
    status: 'succsess',
    code: 201,
    ResponseBody: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
      },
    },
  })
}

module.exports = signUp
