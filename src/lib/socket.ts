import { io } from 'socket.io-client';

const SOCKET_URL: string = import.meta.env.VITE_SOCKET_URL || 'ws://localhost:4000';

const URL: string = `${SOCKET_URL}/events`;

export const createSocketConnection = (token: string | null) => {
  return io(URL, {
    autoConnect: false,
    auth: {
      token,
    },
  });
};
