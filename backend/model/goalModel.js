const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'A text value is required. Please add some text.']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)