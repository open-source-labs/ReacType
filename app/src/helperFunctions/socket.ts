import { io } from 'socket.io-client';
// import config from '../../../config.js';
import serverConfig from '../serverConfig';
const { API_BASE_URL } = serverConfig;
let socket = null;

export const initializeSocket = () => {
  socket = io(API_BASE_URL, {
    transports: ['websocket'],
    // will force new socket connection if re-joining to prevent double emits
    forceNew: true
  });
};

// export socket to ensure a single socket instance across the entire app
export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const emitEvent = (event, roomCode, data) => {
  if (socket) {
    socket.emit(event, roomCode, data);
  }
};
