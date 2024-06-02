import { io } from 'socket.io-client';

const URL: string = 'http://localhost:4000/events';

export const createSocketConnection = (token: string | null) => {
  return io(URL, {
    autoConnect: false,
    auth: {
      token,
    },
  });
};
