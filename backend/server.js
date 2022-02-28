const express = require('express')
const colors = require('colors')
const path = require('path');
const dotenv = require('dotenv').config
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

// config dotenv path.
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// connect to Mongo.
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes') )

// use custom error handler.
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port: ${port}`))
