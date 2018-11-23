var socket = io();

var ctx = document.getElementById("canvas").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Predicted failure",
        data: [],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
  });
  chart.update();
}

socket.on("update", function(msg) {
  // console.log(msg);
  addData(myChart, msg.timestamp, msg.predict);
});
