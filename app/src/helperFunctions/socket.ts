import { io } from 'socket.io-client';
// import config from '../../../config.js';
import serverConfig from '../serverConfig';
const { API_BASE_URL } = serverConfig;
let socket = null;

/**
 * Initializes the socket connection.
 */
export const initializeSocket = () => {
  socket = io(API_BASE_URL, {
    transports: ['websocket'],
    // will force new socket connection if re-joining to prevent double emits
    forceNew: true
  });
};

/**
 * Returns the socket instance.
 * @returns {Socket | null} The socket instance, or null if not initialized.
 */
export const getSocket = () => {
  return socket;
};

/**
 * Disconnects the socket if it's currently connected.
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

/**
 * Emits an event through the socket.
 * @param {string} event - The name of the event to emit.
 * @param {string} roomCode - The room code to emit the event to.
 * @param {any} data - The data to send with the event.
 */
export const emitEvent = (event, roomCode, data) => {
  if (socket) {
    socket.emit(event, roomCode, data);
  }
};
