const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const ctrlWrapper = require('../../middlewares/ctrlWrapper')

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.post('/', ctrlWrapper(ctrl.add))

router.delete('/:contactId', ctrlWrapper(ctrl.deleteById))

router.put('/:contactId', ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateFavorite))

module.exports = router
