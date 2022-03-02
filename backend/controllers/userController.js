const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')
const User = require('../model/userModel')

// @desc Register new user.
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, cellphone, user_role } = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Some fields are missing. Please add all missing fields.')
    }

    // check if user exists.
    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400)
        throw new Error('User already exists.')
    }

    // hash user password.
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        cellphone,
        user_role
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User data is not valid.')
    }    
}) 

// @desc Authenticate a user.
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    // check users email if exists.
    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Unable to login. Invalid user credentials.')        
    }
})

// @desc Get user data.
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.json({message: 'Fetch user data.'})
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}