var express = require('express');
var socket = require('socket.io');

//App setup
//New variable app uses Express as a function
//Create a server using app and set it to listen on a port

var app = express();
var server = app.listen(4000, function(){
    console.log('Listening to requests on port 4000');
});

//Static file
//Used to serve static files

app.use(express.static('public'));

//Set up Socket
//create a new variable and instantiate it using the server created above

var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});