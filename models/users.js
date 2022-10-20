const { Schema, model } = require('mongoose')
const joi = require('joi')

const userSignUpJoiSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email(),
  password: joi.string().min(6).required(),
})
const userLogInJoiSchema = joi.object({
  email: joi.string().email(),
  password: joi.string().min(6).required(),
})
const subscriptionJoiSchema = joi.object({
  subscription: joi.string().valid('starter', 'pro', 'business').required(),
})

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
})

const User = model('user', userSchema)

module.exports = {
  User,
  userSignUpJoiSchema,
  userLogInJoiSchema,
  subscriptionJoiSchema,
}
