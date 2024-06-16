import { io } from 'socket.io-client';

const SOCKET_URL: string = import.meta.env.VITE_SOCKET_URL || 'http://localhost';
const SOCKET_PORT: string = import.meta.env.VITE_SOCKET_PORT || '4000';

const URL: string = `${SOCKET_URL}:${SOCKET_PORT}/events`;

export const createSocketConnection = (token: string | null) => {
  return io(URL, {
    autoConnect: false,
    auth: {
      token,
    },
  });
};
