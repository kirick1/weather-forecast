const getWeatherRequest = require('./requests')

module.exports = (io) => {
  io.on('connection', socket => {
    let data
    getWeatherRequest(current => { data = current })
    socket.on('disconnect', () => console.log('Client disconnected'))
    setInterval(() => getWeatherRequest(current => { data = current }), 2000)
    setInterval(() => io.emit('weather', data), 1000)
  })
}
