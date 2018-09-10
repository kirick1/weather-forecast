const fs = require('fs')
const path = require('path')

function checkLogDirectory (logDirectoryPath) {
  if (!fs.existsSync(logDirectoryPath)) {
    fs.mkdirSync(logDirectoryPath)
    return fs.existsSync(logDirectoryPath)
  } else return true
}

console.log(`Log directory existing: ${checkLogDirectory(path.join(__dirname, '..', 'logs'))}`)

module.exports = (message = '') => {
  const logFilePath = path.join(__dirname, '..', 'logs', 'weather.log')
  const preparedLogMessage = `Time: ${new Date()} | Message: ${message}\n`
  fs.appendFileSync(logFilePath, preparedLogMessage, { encoding: 'utf8' })
}
