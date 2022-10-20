const { User, subscriptionJoiSchema } = require('../../models/users')

const updateSubscription = async (req, res) => {
  const { error } = subscriptionJoiSchema.validate(req.body)
  if (error) {
    error.status = 400
    throw error
  }
  const { _id } = req.user
  const { subscription } = req.body
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true },
  )
  res.json({ status: 'success', code: 200, data: { subscription } })
}

module.exports = updateSubscription
