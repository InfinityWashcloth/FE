var socket = io();

const numOfPoint = 50;
var ctx = document.getElementById("canvas").getContext("2d");

var ctx3 = document.getElementById("canvas3").getContext("2d");

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

var myChart3 = new Chart(ctx3,{
    type: 'pie',
    data: {
        datasets: [{
            data: [40, 60],
            backgroundColor: [
                "red", "green"
            ]
        }],
        
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
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

socket.on("update", function(msg) {
    for (let a of msg.amplitude) {
        addData(myChart, msg.ts, a);
    }
    
});