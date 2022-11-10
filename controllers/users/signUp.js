const { User, userSignUpJoiSchema } = require("../../models/users");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { name, email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  const { error } = userSignUpJoiSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  if (user) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    subscription,
  });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "100h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    status: "succsess",
    code: 201,
    data: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
      },
      token,
    },
  });
};

module.exports = signUp;
