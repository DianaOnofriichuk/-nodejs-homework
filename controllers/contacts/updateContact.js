const { Contact, contactJoiSchema } = require('../../models/contact')

const updateContact = async (req, res) => {
  const { error } = contactJoiSchema.validate(req.body)
  if (error) {
    error.status = 400
    throw error
  }
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  res.json({ status: 'success', code: 200, data: { result } })
}

module.exports = updateContact
