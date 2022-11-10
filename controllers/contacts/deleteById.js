const { Contact } = require("../../models/contact");

const deleteById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: _id });
  if (!result) {
    const error = new Error(`contact with id ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};
module.exports = deleteById;
