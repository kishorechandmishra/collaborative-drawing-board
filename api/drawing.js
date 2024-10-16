const { Server } = require('socket.io');

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).send('Socket.IO server running');
        return;
    }

    // Setup Socket.IO
    const io = new Server(res.socket.server);
    io.on('connection', (socket) => {
        console.log('A user connected');
        
        socket.on('drawing', (data) => {
            socket.broadcast.emit('drawing', data);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    res.socket.server.io = io;
}
