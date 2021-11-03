import { Server } from 'socket.io';

// source: https://stackoverflow.com/a/2117523
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
enum GamePhase {
	Lobby,
	Ingame,
	End
}
declare module 'socket.io' {
	interface Socket {
		uuid: string;
	}
}
interface Player {
	username: string,
	uuid: string,
}

interface Lobby {
	players: Player[];
	gamePhase: GamePhase;
	settings: {[key: string]: any};
}

const defaultLobby: Lobby = {
	players: [],
	gamePhase: GamePhase.Lobby,
	settings: {}
};
interface Lobbies {
	[key: string] : Lobby
}
const lobbies: Lobbies = {};

const io = new Server({ cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] } });

io.on('connection', (socket) => {
	console.log(socket.id, 'connected');
	socket.on('joinRoom', (room) => {
		console.log(socket.id, 'joined room: ', room);
	});
	socket.on('id', (id: null | string, callback ) => {
		if (id === null) {
			id = uuidv4();
		}
		socket['uuid'] = id;

		console.log("added uuid to", socket.id);
		callback(id);
	});

});

io.listen(8000);
