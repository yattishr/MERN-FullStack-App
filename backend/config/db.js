const mongoose = require('mongoose')
const dotenv = require('dotenv').config

const connectDB = async () => {
    try {
        // console.log(`Logging MondoDb connection string: ${process.env.MONGO_URI}`)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected on: ${conn.connection.host}`.cyan.underline)
    }
    catch (error) {
        console.log(`Oooopss...There was a ${error} error connecting to Mongo! Exiting process...`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB