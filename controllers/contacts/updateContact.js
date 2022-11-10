const { Contact, contactJoiSchema } = require("../../models/contact");

const updateContact = async (req, res) => {
  const { _id } = req.user;

  const { error } = contactJoiSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...req.body, owner: _id },
    {
      new: true,
    }
  );
  res.json({ status: "success", code: 200, data: { result } });
};

module.exports = updateContact;
