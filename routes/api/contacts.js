const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const ctrlWrapper = require('../../middlewares/ctrlWrapper')
const auth = require('../../middlewares/auth')

router.get('/', auth, ctrlWrapper(ctrl.getAll))

router.get('/:contactId', auth, ctrlWrapper(ctrl.getById))

router.post('/', auth, ctrlWrapper(ctrl.add))

router.delete('/:contactId', auth, ctrlWrapper(ctrl.deleteById))

router.put('/:contactId', auth, ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', auth, ctrlWrapper(ctrl.updateFavorite))

module.exports = router
