const { Contact, favoriteJoiSchema } = require('../../models/contact')

const updateFavorite = async (req, res) => {
  const { _id } = req.user
  const { error } = favoriteJoiSchema.validate(req.body)
  if (error) {
    error.status = 400
    throw error
  }
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite, owner: _id },
    {
      new: true,
    },
  )
  res.json({ status: 'success', code: 200, data: { result } })
}
module.exports = updateFavorite
