const log = console.log
// initialize http server, socket.io and port number
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    log('connected')
    socket.on('message', (evt) => {
        log(evt)
        socket.broadcast.emit('message', evt)
    })
})

io.on('disconnect', (evt) => {
    log('some people left')
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});