const express = require('express')
const router = express.Router()

const auth = require('../../middlewares/auth')
const { users: ctrl } = require('../../controllers')
const ctrlWrapper = require('../../middlewares/ctrlWrapper')

router.post('/signup', ctrlWrapper(ctrl.signUp))
router.post('/login', ctrlWrapper(ctrl.LogIn))
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))
router.get('/logout', auth, ctrlWrapper(ctrl.logOut))
router.patch('/', auth, ctrlWrapper(ctrl.updateSubscription))

module.exports = router
