import { io } from 'socket.io-client';
import config from '../../../config';

const { API_BASE_URL } = config;

// Initialize the socket connection
const socket = io(API_BASE_URL, {
  transports: ['websocket']
});

export default socket;
