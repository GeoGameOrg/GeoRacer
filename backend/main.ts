import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid'

// source: https://stackoverflow.com/a/2117523
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
	settings: { [key: string]: any };
}

const defaultLobby: Lobby = {
	players: [],
	gamePhase: GamePhase.Lobby,
	settings: {}
};
interface Lobbies {
	[key: string]: Lobby
}
const lobbies: Lobbies = {};

const io = new Server({ cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] } });

io.on('connection', (socket) => {
	console.log(socket.id, 'connected');
	socket.on('joinRoom', (room, callback) => {
		console.log(socket.id, 'joined room: ', room);
		let success = true;
		callback(success)	
	});
	socket.on('id', (id: null | string, callback) => {
		if (id === null) {
			id = uuidv4();
		}
		socket['uuid'] = id;

		console.log("added uuid to", socket.id);
		callback(id);
	});

});

io.listen(8000);
