require('dotenv').load()

const logger = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


module.exports = app
