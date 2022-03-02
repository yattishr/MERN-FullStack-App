const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please input a name.']
    },
    email: {
        type: String,
        required: [true, 'Please input an email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please input a password.']
    },
    cellphone: {
        type: String
    },
    user_role: {
        type: String
    }
},
{
    timestamps: true    
})
module.exports = mongoose.model('User', userSchema)