import { io } from 'socket.io-client';
import config from '../../../config';

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

// export socket to ensure a single socket instance across the entire app
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
