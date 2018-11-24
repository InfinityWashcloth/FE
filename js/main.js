var socket = io();

const numOfPoint = 50;
var ctx = document.getElementById("canvas").getContext("2d");

var ctx3 = document.getElementById("canvas3").getContext("2d");

var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(0, '#80b6f4');
gradientStroke.addColorStop(1, '#f49080');

var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");


var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: new Array(numOfPoint),
        datasets: [{
            label: "Predicted failure",
            borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 4,
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
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 20
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }

            }]
        }
    }
});

var myChart3 = new Chart(ctx3, {
    type: 'pie',
    data: {
        datasets: [{
            data: [40, 60],
            backgroundColor: [
                "rgba(255,0,0,0.8)", "rgba(0,255,0,0.5)"
            ]
        }],
        labels: [
            'Failure',
            'OK',
        ]
    },
    options: {}
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

function addDataR(chart, p) {
    chart.data.datasets.forEach(dataset => {
        dataset.data[0] = p;
        dataset.data[1] = 1 - p;
    });
    chart.update();
}

socket.on("update", function(msg) {
    for (let a of msg.amplitude) {
        addData(myChart, msg.ts, a);
    }

    addDataR(myChart3, msg.analysis_data)
});