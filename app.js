require('dotenv').load()

const cors = require('cors')
const path = require('path')
const http = require('http')
const morgan = require('morgan')
const express = require('express')

const app = express()
const server = http.Server(app)

const io = require('socket.io')(server)
const socket = require('./utils/sockets')

app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'views', 'index.html')))

app.use((req, res) => res.redirect('/'))

socket(io)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
