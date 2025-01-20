import io from 'socket.io-client';

const socket = io('http://localhost:1337');  // Match the server URL

socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

socket.on('message', (message) => {
  console.log('Received message:', message);
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

export default socket;