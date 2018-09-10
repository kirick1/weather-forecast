/* eslint-disable no-unused-vars,no-undef,semi,no-useless-escape,eol-last,no-trailing-spaces */
var socket;
var chart;

function addData (city, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets[(city === 'kiev' ? 0 : 1)].data.push(data);
  chart.update();
}

(function () {
  window.onload = function () {
    var chartElement = document.getElementById('weather-forecast-chart');
    chart = new Chart(chartElement, chartOptions);

    var serverAddress = (window.location.hostname === 'localhost') ? 'http://localhost:3000/' : 'https://dashboard.heroku.com/apps/weather-forecast-test-task'

    socket = io(serverAddress);
    socket.on('weather', function (data) {
      if (!data) return;
      if (data.kiev) {
        const kiev = JSON.parse(data.kiev);
        document.getElementById('kiev-weather-description').innerText = kiev.weather[0].description;
        document.getElementById('kiev-weather-text').innerText = `Temperature: ${kiev.main.temp}\nPressure: ${kiev.main.pressure}`;
        addData('kiev', new Date(), kiev.main.temp)
      } else {
        document.getElementById('kiev-weather-description').innerText = 'did not wait for the weather data';
        document.getElementById('kiev-weather-text').innerText = ''
      }
      if (data.london) {
        const london = JSON.parse(data.london);
        document.getElementById('london-weather-description').innerText = london.weather[0].description;
        document.getElementById('london-weather-text').innerText = `Temperature: ${london.main.temp}\nPressure: ${london.main.pressure}`;
        addData('london', new Date(), london.main.temp)
      } else {
        document.getElementById('london-weather-description').innerText = 'Rain';
        document.getElementById('london-weather-text').innerText = '';
      }
    });
  }
  window.onclose = function () {
    return socket.disconnect();
  }
})()