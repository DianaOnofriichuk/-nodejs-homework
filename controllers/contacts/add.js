const { Contact, contactJoiSchema } = require('../../models/contact')

const add = async (req, res) => {
  const { error } = contactJoiSchema.validate(req.body)
  if (error) {
    error.status = 400
    throw error
  }
  const result = await Contact.create(req.body)
  res.status(201).json({ status: 'success', code: 201, data: { result } })
}
module.exports = add
