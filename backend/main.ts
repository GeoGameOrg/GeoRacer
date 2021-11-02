import { Server } from 'socket.io';

const io = new Server({ cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] } });

io.on('connection', (socket) => {
	console.log(socket.id, "connected")
	socket.on("joinRoom",(room) => {console.log(socket.id,"joined room: ",room)})
});

io.listen(8000);
