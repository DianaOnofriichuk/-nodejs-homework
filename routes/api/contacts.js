const express = require('express')
const router = express.Router()
const joi = require('joi')
const contactsOperations = require('../../models/contacts')

const contactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email(),
  phone: joi.required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({ status: 'success', code: 200, data: { result: contacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      const error = new Error(`contact with id ${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({ status: 'success', code: 200, data: { result } })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, data: { result } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      const error = new Error(`contact with id ${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContact(contactId, req.body)
    res.json({ status: 'success', code: 200, data: { result } })
  } catch (error) {
    next(error)
  }
})

module.exports = router
