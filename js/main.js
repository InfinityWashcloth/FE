var socket = io();

socket.on('update', function (msg) {
    console.log(msg);
});