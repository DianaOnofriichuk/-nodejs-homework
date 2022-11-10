const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { name, page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  let contacts = [];
  const allContacts = await Contact.find({ owner: _id });

  if (name !== "") {
    contacts = await Contact.find(
      { owner: _id, name: { $regex: name, $options: name } },
      "",
      {
        skip,
        limit: Number(limit),
      }
    );
  } else {
    contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    });
  }

  res.json({ total: allContacts.length, contacts });
};
module.exports = getAll;
