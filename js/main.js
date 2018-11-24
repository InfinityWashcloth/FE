var socket = io();

socket.on("connect", function() {
    setTimeout(() => {
        socket.emit("update");
    }, 4000)

})

const numOfPoint = 50;
var ctx = document.getElementById("canvas").getContext("2d");

// var ctx3 = document.getElementById("canvas3").getContext("2d");

// var gradientStroke = ctx.createLinearGradient(1000, 0, 100, 0);
// gradientStroke.addColorStop(0, "#0f0");
// gradientStroke.addColorStop(1, "#f0f");

var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");

var pointBackgroundColors = [];

var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: new Array(numOfPoint),
        datasets: [{
            label: "Predicted failure",
            // borderColor: gradientStroke,
            // pointBorderColor: gradientStroke,
            // pointHoverBackgroundColor: gradientStroke,
            // pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 2,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: new Array(numOfPoint),
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 4,
            data: new Array(numOfPoint),
            pointBackgroundColor: new Array(numOfPoint),
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


function addData(chart, label, data, p) {
    chart.data.labels.push(new Date(label).toLocaleTimeString());
    chart.data.labels.shift();
    chart.data.datasets.forEach(dataset => {
        dataset.data.push(data);
        dataset.data.shift();

        var col = p * 255

        dataset.pointBackgroundColor.push(`rgba(255,0,0, ${p})`);
        dataset.pointRadius.push(15 * p);

        dataset.pointBackgroundColor.shift();
        dataset.pointRadius.shift();

    });


    chart.update();
}


socket.on("update", function(msg) {

    socket.emit("update");

    addData(myChart, msg.ts, Math.abs(msg.amplitude), msg.analysis_data);
    // addDataR(myChart3, msg.analysis_data);

});