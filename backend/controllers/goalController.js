const asyncHandler = require('express-async-handler')

// import Goal model & schema
const Goal = require('../model/goalModel')

// import User model & schema
const User = require('../model/userModel')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
    // res.status(200).json({message: 'Fetching All Goals...', goals})
})

// @desc Get goals By Id
// @route GET /api/goals/:id
// @access Private
const getGoalsById = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Fetching Goal: ${req.params.id} ...`})
}) 

// @desc Set goals By Id
// @route POST /api/goals/:id
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add some body text.')
    }
    res.status(200).json({message: 'Setting Goals...'})
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id // store only logged in users goal.
    })
}) 

// @desc Update goals [By Id]
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Sorry. Goal was not found.')
    }

    // if user doesnt exist
    if(!req.user) {
        res.status(401)
        throw new Error('User not found.')
    }

    // Make sure the logged in user matches the Goal's User
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updateGoal)
    // res.status(200).json({message: `Updating Goal: ${req.params.id} ...`})
}) 

// @desc Delete goal [By Id]
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Sorry. Goal was not found.')
    }

    // if user doesnt exist
    if(!req.user) {
        res.status(401)
        throw new Error('User not found.')
    }

    // Make sure the logged in user matches the Goal's User
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }    

    await goal.remove()
    res.status(200).json({ _id: req.params.id})

    // res.status(200).json({message: `Deleting Goal: ${req.params.id} ...`})
}) 

module.exports = {
    getGoals,
    getGoalsById,
    setGoal,
    updateGoal,
    deleteGoal
}