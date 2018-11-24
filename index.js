const express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("./"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


io.on("connection", function(socket) {
    console.log("a user connected");
});

setInterval(() => {
    io.emit("update", { ts: +new Date(), amplitude: Math.random(), analysis_data: Math.random() });
}, 3000);

http.listen(3000, function() {
    console.log("listening on *:3000");
});