var socket = io();

const numOfPoint = 50;
var ctx = document.getElementById("canvas").getContext("2d");


var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: new Array(numOfPoint),
        datasets: [{
            label: "Predicted failure",
            data: new Array(numOfPoint),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.labels.shift();
    chart.data.datasets.forEach(dataset => {
        dataset.data.push(data);
        dataset.data.shift();
    });
    chart.update();
}

socket.on("update", function(msg) {
    addData(myChart, msg.timestamp, msg.predict);
});