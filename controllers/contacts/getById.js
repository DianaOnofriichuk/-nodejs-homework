const {Contact} = require('../../models/contact')

const getById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
  if (!result) {
    const error = new Error(`contact with id ${contactId} not found`)
    error.status = 404
    throw error
  }
  res.json({ status: 'success', code: 200, data: { result } })
}
module.exports = getById
