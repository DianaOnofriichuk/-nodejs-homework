const { Contact, favoriteJoiSchema } = require('../../models/contact')

const updateFavorite = async (req, res) => {
  const { error } = favoriteJoiSchema.validate(req.body)
  if (error) {
    error.status = 400
    throw error
  }
  const { contactId } = req.params
  const { favorite } = req.body
  console.log(favorite)
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    },
  )
  res.json({ status: 'success', code: 200, data: { result } })
}
module.exports = updateFavorite
