var socket = io();

socket.on('update', function (msg) {
    console.log(msg);
});    

var ctx = document.getElementById("canvas").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1,2,3,4,5,6],
        datasets: [{
            label: 'Predicted failure',
            data: [30, 30, 70, 90, 60, 30],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});