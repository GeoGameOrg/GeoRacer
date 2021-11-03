import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

export const joinRoom = (room: Number ) => { socket.emit("joinRoom", room)}
