"use strict";
exports.__esModule = true;
exports.joinRoom = void 0;
var socket_io_client_1 = require("socket.io-client");
var socket = (0, socket_io_client_1.io)('http://localhost:8000');
var joinRoom = function (room) { socket.emit("joinRoom", room); };
exports.joinRoom = joinRoom;
