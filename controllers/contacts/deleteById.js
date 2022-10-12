const { Contact } = require('../../models/contact')

const deleteById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    const error = new Error(`contact with id ${contactId} not found`)
    error.status = 404
    throw error
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: { result },
  })
}
module.exports = deleteById
