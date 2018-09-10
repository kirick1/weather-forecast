const fs = require('fs')
const path = require('path')

function checkLogDirectory (logDirectoryPath) {
  if (!fs.existsSync(logDirectoryPath)) {
    fs.mkdirSync(logDirectoryPath)
    return fs.existsSync(logDirectoryPath)
  } else return true
}
function prepareLogData (message) {
  return `Time: ${new Date()} | Message: ${message}\n`
}

console.log(`Log directory existing: ${checkLogDirectory(path.join(__dirname, '..', 'logs'))}`)

function writeLog (message = '') {
  const logFilePath = path.join(__dirname, '..', 'logs', 'weather.log')
  const preparedLogMessage = prepareLogData(message)
  fs.appendFileSync(logFilePath, preparedLogMessage, { encoding: 'utf8' })
}

module.exports = { writeLog }
