/* eslint-disable no-unused-vars,no-undef,semi,no-useless-escape,eol-last */
var chartOptions = {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Kiev temperature',
      data: [],
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1
    }, {
      label: 'London temperature',
      data: [],
      backgroundColor: 'rgb(255, 159, 64)',
      borderColor: 'rgb(255, 159, 64)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        type: 'time',
        time: {
          unit: 'second'
        }
      }],
      yAxes: [{
        display: true
      }]
    }
  }
};