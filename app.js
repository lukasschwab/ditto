var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var engines = require('consolidate');

// Rendering engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.send("<h1>Ya got it</h1>")
})

// Temporary
var magnet = "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent"

app.get('/watch/*', function(req, res) {
    // res.sendFile(__dirname + '/index.html');
    res.render("video")
});

app.get('*', function(req, res) {
    res.redirect('/');
})

nsp = createNamespace("main", magnet);
console.log("Default nsp created", nsp.magnet)

// io.on('connection', function(socket){
//     console.log("A user connected.");
//     socket.emit('magnet', magnet)
//     console.log("Sent magnet", magnet)
//     socket.on('disconnect', function(){
//         console.log('user disconnected')
//     })
// });

// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//         io.emit('chat message', msg)
//     })
// })

// io.on('connection', function(socket){
//     socket.on('pause', function(){
//         console.log("pause signal")
//         io.emit('pause')
//     })
// })

// io.on('connection', function(socket){
//     socket.on('play', function(time){
//         console.log("play signal")
//         io.emit('play', time)
//     })
// })

function createNamespace(id, magnet) {
    var nsp = io.of('/' + id);
    nsp.on('connection', function(socket){
        console.log("A user connected to", nsp.name);
        socket.emit('magnet', magnet)
        console.log("Sent magnet", magnet)
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
            console.log("pause signal")
            nsp.emit('pause')
        })
    })

    nsp.on('connection', function(socket){
        socket.on('play', function(time){
            console.log("play signal")
            nsp.emit('play', time)
        })
    })
    
    nsp.magnet = magnet;

    return nsp
}

var port = process.env.PORT || 3000;
http.listen(port, function(){
    console.log('Listening on', port);
});
