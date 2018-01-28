var express = require('express');
var app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http);
// var engines = require('consolidate');

var xkcdPassword = require('xkcd-password')
var pw = new xkcdPassword();
var tempOptions = {
    numWords: 4,
    minLength: 4,
    maxLength: 7
}

app.use(express.static('public'))

// Rendering engine
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
})

// Temporary
var magnet = "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent"

app.get('/watch/*', function(req, res) {
    res.sendFile(__dirname + '/views/video.html');
    // res.render("video")
});

app.get('*', function(req, res) {
    res.redirect('/');
})

io.on('connection', function(socket) {
    console.log("Someone connected to main page.")
    socket.on('makeroom', function(magnet){
        // Make a new room
        pw.generate(tempOptions).then(function(id) {
            id = id.join('-')
            nsp = createNamespace(id, magnet)
            socket.emit('redirect', id)
        })
    })
})

nsp = createNamespace("main", magnet);
console.log("Default nsp created", nsp.magnet)

function createNamespace(id, magnet) {
    var nsp = io.of('/' + id);
    nsp.on('connection', function(socket){
        console.log("A user connected to", nsp.name);
        socket.emit('magnet', nsp.magnet)
        socket.on('disconnect', function(){
            console.log('user disconnected')
        })
    });

    nsp.on('connection', function(socket){
        socket.on('chat message', function(msg){
            nsp.emit('chat message', msg)
        })
    })

    nsp.on('connection', function(socket){
        socket.on('pause', function(){
            nsp.emit('pause')
        })
    })

    nsp.on('connection', function(socket){
        socket.on('play', function(time){
            nsp.emit('play', time)
        })
    })
    
    nsp.magnet = magnet;
    console.log("Made namespace", id, magnet)

    return nsp
}

var port = process.env.PORT || 3000;
http.listen(port, function(){
    console.log('Listening on', port);
});
