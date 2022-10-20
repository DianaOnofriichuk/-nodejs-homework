const { Contact } = require('../../models/contact')

const getAll = async (req, res) => {
  const { _id } = req.user
  const { page = 1, limit = 10, favorite } = req.query
  const skip = (page - 1) * limit
  let contacts = null
  if (!favorite) {
    contacts = await Contact.find({ owner: _id }, '', {
      skip,
      limit: Number(limit),
    })
  } else
    contacts = await Contact.find({ owner: _id, favorite }, '', {
      skip,
      limit: Number(limit),
    })

  res.json({ status: 'success', code: 200, data: { result: contacts } })
}
module.exports = getAll
