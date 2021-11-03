import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid'
import { CreateRoomSocketResponse, JoinRoomSocketResponse, IdSocketResponse } from './models/socketResponse'
import { Lobby, Lobbies } from './models/lobby'
import { Player } from './models/player'

declare module 'socket.io' {
	interface Socket {
		uuid: string
		username: string
	}
}


const lobbies: Lobbies = {};

const io = new Server({ cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] } });

io.on('connection', (socket) => {
	console.log(socket.id, 'connected');
	socket.on('createRoom', (callback: (response: CreateRoomSocketResponse) => void) => {
		console.debug(socket.id, "[createRoom]");

		// Check for socket uuid
		if (socket.uuid !== undefined) {
			console.debug(socket.id, "[createRoom]", `keeping id '${socket.uuid}'`);
		} else {
			socket.uuid = uuidv4();
			console.debug(socket.id, "[createRoom]", `generated id '${socket.uuid}'`);
		}

		// Check for Username (Create if undefined)
		var username = socket.username;
		if (username === undefined) {
			username = uuidv4()
			console.debug(socket.id, "[createRoom]", `generated username '${username}'`);
		} else {
			console.debug(socket.id, "[createRoom]", `keeping username '${username}'`);
		}

		// Create & Save Player
		let hostPlayer = new Player(username, socket.uuid)

		// Create & Save Lobby
		let lobbyId = uuidv4();
		let lobby = Lobby.withHost(hostPlayer, lobbyId)
		lobbies[lobbyId] = lobby
		console.log("PLAYERS", lobby.players)
		console.log(lobbies[lobbyId])

		socket.join(lobbyId);
		callback(CreateRoomSocketResponse.success(lobby))
	});

	socket.on('joinRoom', (lobbyId: string, callback: (response: JoinRoomSocketResponse) => void) => {
		console.debug(socket.id, "[joinRoom]");
		// Check if Lobby exists
		if (lobbies[lobbyId] === undefined) {
			console.error(socket.id, "[joinRoom]", "error: lobby not found");
			callback(JoinRoomSocketResponse.failure(`Lobby '${lobbyId}' not found`));
			return;
		}

		// Check for socket uuid
		if (socket.uuid !== undefined) {
			console.debug(socket.id, "[joinRoom]", `keeping id '${socket.uuid}'`);
		} else {
			socket.uuid = uuidv4();
			console.debug(socket.id, "[joinRoom]", `generated id '${socket.uuid}'`);
		}

		// Check for Username (Create if undefined)
		if (socket.username === undefined) {
			socket.username = uuidv4()
			console.debug(socket.id, "[joinRoom]", `generated username '${socket.username}'`);
		} else {
			console.debug(socket.id, "[joinRoom]", `keeping username '${socket.username}'`);
		}

		let player: Player = new Player(socket.username, socket.uuid)
		if (!lobbies[lobbyId].players.some(p => p.uuid == player.uuid)) {
			lobbies[lobbyId].players.push(player)
		} else {
			console.info(socket.id, "[joinRoom]", `failure: ${player.uuid} already in lobby`);
			callback(JoinRoomSocketResponse.failure("Already in Lobby"))
			return
		}

		socket.join(lobbyId);
		console.info(socket.id, "[joinRoom]", "successful:" + player);
		callback(JoinRoomSocketResponse.success(lobbies[lobbyId]))
	});

	socket.on('id', (id: null | string, callback: (response: IdSocketResponse) => void) => {
		console.debug(socket.id, "[id]");

		//TODO: Generate ID if a previous one was not provided
		if (id === null) {
			id = uuidv4();
			console.debug(socket.id, "[id]", `success: generated '${id}'`);
		} else {
			console.debug(socket.id, "[id]", `success: provided '${id}'`);
		}

		socket['uuid'] = id;
		console.info(socket.id, "[id]", `assigned id '${id}' to socket`);

		callback(IdSocketResponse.success(id));
	});

});

io.listen(8000);
