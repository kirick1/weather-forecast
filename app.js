require('dotenv').load()

const cors = require('cors')
const path = require('path')
const http = require('http')
const morgan = require('morgan')
const express = require('express')

const app = express()
const server = http.createServer(app)

const io = require('socket.io')(server, { origins: '*:*' })
const sockets = require('./utils/sockets')

app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  next()
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'views', 'index.html')))

sockets(io)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
