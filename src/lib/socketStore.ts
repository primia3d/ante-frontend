import { create } from 'zustand';
import { Socket } from 'socket.io-client';

import { ServerToClientEvents, ClientToServerEvents, payload } from '@/types/socket.type';
import { createSocketConnection } from '@/lib/socket';
import { TOKEN } from '@/constants/common';

type SocketStore = {
  socket: Socket<ClientToServerEvents<unknown>, ServerToClientEvents<unknown>> | null;
  connect: () => void;
  disconnect: () => void;
  sendMessage: <T>(event: string, messagePayload: payload<T>) => void;
  onEvent: <T>(event: string, callback: (response: T) => void) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  connect: () => {
    const newSocket = createSocketConnection(TOKEN);
    newSocket.on('ON_WELCOME', (data) => {
      // eslint-disable-next-line no-console
      console.log('Received ON_WELCOME:', data);
    });
    newSocket.connect();
    set({ socket: newSocket });
  },
  disconnect: () => {
    const currentSocket = useSocketStore.getState().socket;
    if (currentSocket) {
      currentSocket.disconnect();
      set({ socket: null });
    }
  },
  sendMessage: async <T>(event: string, messagePayload: payload<T>) => {
    const currentSocket = useSocketStore.getState().socket;
    if (currentSocket) {
      currentSocket.emit(event, messagePayload);
    } else {
      // eslint-disable-next-line no-console
      console.error('Socket is not connected. Cannot send message.');
    }
  },
  onEvent: <T>(event: string, callback: (response: T) => void) => {
    const currentSocket = useSocketStore.getState().socket;
    if (currentSocket) {
      currentSocket.on(event, (response) => {
        callback(response as T);
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('Socket is not connected. Cannot listen for events.');
    }
  },
}));
