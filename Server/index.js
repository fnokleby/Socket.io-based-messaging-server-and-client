var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('name change', (nameJson)=> {
        let oldName = nameJson.oldName;
        let newName = nameJson.newName;
        console.log(oldName + " : " + newName)
        io.emit('name change', nameJson);
    });
});

  
http.listen(3000, () => {
    console.log('listening on *:3000');
});