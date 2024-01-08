import { io } from 'socket.io-client';
import config from '../../../config';

//DON'T connect client in this file, instead export a function that creates a new socket connection
// const { API_BASE_URL } = config;
// let socket;
// //disconnect previous socket connection
// if (socket) socket.disconnect();
// // Initialize the socket connection

// socket = io(API_BASE_URL, {
//   transports: ['websocket']
// });
// export default socket;

let socket = null;

export const initializeSocket = () => {
  socket = io(config.API_BASE_URL, {
    transports: ['websocket'],
    // will force new socket connection if re-joining to prevent double emits
    forceNew: true
  });
  console.log('A user connected');
  console.log('socket:', socket);
  // }
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const emitEvent = (event, roomCode, data) => {
  if (socket) {
    socket.emit(event, roomCode, data);
  }
};
