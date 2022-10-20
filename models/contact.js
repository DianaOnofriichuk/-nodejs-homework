const { Schema, model } = require('mongoose')
const joi = require('joi')

const contactJoiSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email(),
  phone: joi.required(),
  favorite: joi.bool(),
})
const favoriteJoiSchema = joi.object({
  favorite: joi.bool().required(),
})

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)

module.exports = { Contact, contactJoiSchema, favoriteJoiSchema }
