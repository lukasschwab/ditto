var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("A user connected.");
    socket.on('disconnect', function(){
        console.log('user disconnected')
    })
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg)
    })
})

io.on('connection', function(socket){
    socket.on('pause', function(){
        console.log("p/p signal")
        io.emit('pause')
    })
})

io.on('connection', function(socket){
    socket.on('play', function(time){
        console.log("play signal")
        io.emit('play', time)
    })
})

http.listen(3000, function(){
    console.log('Listening on *:3000');
});

