const http = require('http')

const writeLog = require('./logger')

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

module.exports = (callback) => {
  const status = { finished: false }
  const currentWeather = { Kiev: '', London: '' }

  const weatherForKievRequest = http.get(`http://api.openweathermap.org/data/2.5/weather?q=Kiev&APPID=${OPENWEATHERMAP_API_KEY}`)
    .on('response', response => {
      response.on('data', chunk => { currentWeather.Kiev += chunk })
      response.on('end', () => { if (!status.finished) weatherForLondonRequest.abort() })
    })
    .setTimeout(3000, () => weatherForKievRequest.abort())
    .on('abort', () => {
      writeLog('Request for Kiev was aborted')
      currentWeather.Kiev = ''
    })
    .on('error', error => {
      if (error.message !== 'socket hang up') writeLog(`Request for Kiev error: ${error.message}`)
      console.error('Request for Kiev error: ', error.message)
    })
    .on('close', () => callback(currentWeather))

  const weatherForLondonRequest = http.get(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${OPENWEATHERMAP_API_KEY}`)
    .on('response', response => {
      response.on('data', chunk => { currentWeather.London += chunk })
      response.on('end', () => { status.finished = true })
    })
    .setTimeout(3000, () => weatherForLondonRequest.abort())
    .on('abort', () => {
      writeLog('Request for London was aborted')
      currentWeather.London = ''
    })
    .on('error', error => {
      if (error.message !== 'socket hang up') writeLog(`Request for London error: ${error.message}`)
      console.error('Request for London error: ', error.message)
    })
}
