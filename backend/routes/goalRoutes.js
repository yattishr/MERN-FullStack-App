const express = require('express')
const router = express.Router()
const {getGoals, getGoalsById, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

router.get('/', getGoals)

router.get('/:id', getGoalsById)

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

module.exports = router