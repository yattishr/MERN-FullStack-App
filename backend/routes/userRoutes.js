const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')

// add a user on registration.
router.post('/', registerUser)

// login user
router.post('/login', loginUser)

// fetch user information.
router.get('/me', getMe)

module.exports = router