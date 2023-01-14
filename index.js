const express = require('express'),
    cors = require('cors'),
    socket = require('socket.io');

// App setup
const app = express();
//enable all cors
app.use(cors());
//start  the server
const server = app.listen(4000, function(){
    console.log('listening to requests on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server, {
    //set allowed origins
    cors: {origin: ["http://localhost:3000"]}
});

io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});
