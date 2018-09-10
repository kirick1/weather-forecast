/* eslint-disable no-unused-vars,no-undef,semi,no-useless-escape,eol-last,no-trailing-spaces */
var socket;
var chart;

function addData (city, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets[(city === 'Kiev' ? 0 : 1)].data.push(data);
  chart.update();
}
function convertKelvinToCelsium (temperature) {
  var difference = 273.15;
  var celsium = temperature - difference;
  return parseInt(celsium);
}

(function () {
  window.onload = function () {
    var chartElement = document.getElementById('weather-forecast-chart');
    chart = new Chart(chartElement, chartOptions);

    socket = io((window.location.hostname === 'localhost') ? 'http://localhost:3000/' : 'https://dashboard.heroku.com/apps/weather-forecast-test-task');
    socket.on('weather', function (data) {
      if (!data) return null;
      if (data.Kiev) {
        const kievData = JSON.parse(data.Kiev);
        document.getElementById('kiev-weather-description').innerText = kievData.weather[0].main;
        document.getElementById('kiev-weather-description').title = 'Weather';
        document.getElementById('kiev-weather-temperature').innerText = `Temperature:  ${convertKelvinToCelsium(kievData.main.temp)}°C`;
        document.getElementById('kiev-weather-temperature').title = 'Temperature';
        document.getElementById('kiev-weather-pressure').innerText = `Pressure:  ${kievData.main.pressure} hPa`;
        document.getElementById('kiev-weather-pressure').title = 'Atmosphere pressure';
        addData('Kiev', new Date(), convertKelvinToCelsium(kievData.main.temp));
      } else {
        document.getElementById('kiev-weather-description').innerText = 'did not wait for the weather data';
        document.getElementById('kiev-weather-description').title = 'Something went wrong';
        document.getElementById('kiev-weather-temperature').innerText = ''
        document.getElementById('kiev-weather-temperature').title = 'Something went wrong';
        document.getElementById('kiev-weather-pressure').innerText = '';
        document.getElementById('kiev-weather-pressure').title = 'Something went wrong';
      }
      if (data.London) {
        const londonData = JSON.parse(data.London);
        document.getElementById('london-weather-description').innerText = londonData.weather[0].main;
        document.getElementById('london-weather-description').title = 'Weather';
        document.getElementById('london-weather-temperature').innerText = `Temperature:  ${convertKelvinToCelsium(londonData.main.temp)}°C`;
        document.getElementById('london-weather-temperature').title = 'Temperature';
        document.getElementById('london-weather-pressure').innerText = `Pressure:  ${londonData.main.pressure} hPa`;
        document.getElementById('london-weather-pressure').title = 'Atmosphere pressure';
        addData('London', new Date(), convertKelvinToCelsium(londonData.main.temp));
      } else {
        document.getElementById('london-weather-description').innerText = 'Rain';
        document.getElementById('london-weather-description').title = 'Very long waiting for an answer';
        document.getElementById('london-weather-temperature').innerText = '';
        document.getElementById('london-weather-temperature').title = 'Something went wrong';
        document.getElementById('london-weather-pressure').innerText = '';
        document.getElementById('london-weather-pressure').title = 'Something went wrong';
      }
    });
  }
  window.onclose = function () {
    return socket.disconnect();
  }
})()