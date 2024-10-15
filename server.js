const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(__dirname)); // Use the current directory

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data); // Broadcast drawing data to other clients
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
