var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));
app.use('/scripts', express.static(__dirname + '../node_modules/jquey/dist/'));


app.get('/hola', function (req, res) {
  res.send('Hello World!')
})


var messages = [
    {
        id:1,
        text: 'Bienvenido al chat',
        nickname: 'Admin'
    }
];

io.on('connection', function (socket){
    console.log("El nodo con IP: ", socket.handshake.address, "se ha conectado" );    

    socket.emit('messages', messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

    socket.on('disconnect', function() {        
        console.log("El nodo con IP: ", socket.handshake.address, "se ha desconectado" );
    });
})

server.listen(6677, function(){
    console.log('El servidor esta funcionando en http://localhost:6677');
});



