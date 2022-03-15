const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware') // middleware for route authorization

// add a user on registration.
router.post('/', registerUser)

// login user
router.post('/login', loginUser)

// fetch user information.
router.get('/me', protect, getMe)

// router.get('/me', getMe)

module.exports = router