import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

type SocketResponse = {
    success: boolean;
    data: any
    error: string | null;
}

function defaultCallbackHandler(response: SocketResponse) {
    if (response.success) {
        console.info("SUCCESS:", response.data)
    } else {
        console.warn("FAILURE:", response.error)
    }
}

export const joinRoom = (room: Number, callbackHandler: (response: SocketResponse) => void | null) => { socket.emit("joinRoom", room, callbackHandler ?? defaultCallbackHandler) }
export const createRoom = (callbackHandler: (response: SocketResponse) => void | null) => { socket.emit("createRoom", callbackHandler ?? defaultCallbackHandler) }
