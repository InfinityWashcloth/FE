var socket = io("10.84.4.14:8080/");

const numOfPoint = 50;
var ctx = document.getElementById("canvas").getContext("2d");

function callback() {
    console.log(arguments);
}

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
        legend: {
            display: false,
        },
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
    chart.data.labels.push(new Date(label).toLocaleTimeString());
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