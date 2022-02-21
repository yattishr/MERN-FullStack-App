const asyncHandler = require('express-async-handler')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Fetching All Goals...'})
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
}) 

// @desc Update goals [By Id]
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Updating Goal: ${req.params.id} ...`})
}) 

// @desc Delete goal [By Id]
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Deleting Goal: ${req.params.id} ...`})
}) 

module.exports = {
    getGoals,
    getGoalsById,
    setGoal,
    updateGoal,
    deleteGoal
}