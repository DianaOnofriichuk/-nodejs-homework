const { User } = require("../../models/users");

const getCurrent = async (req, res) => {
  const { name, email, avatarURL } = req.user;
  res.json({ status: "succsess", code: 200, user: { name, email, avatarURL } });
};

module.exports = getCurrent;
