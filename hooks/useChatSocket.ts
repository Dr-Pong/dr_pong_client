import { Socket, io } from 'socket.io-client';

import { useCallback } from 'react';

import getAuthorization from 'utils/cookieUtil';

const sockets: { [key: string]: Socket } = {};
const useChatSocket = (namespace?: string): [Socket, () => void] => {
  if (!namespace) namespace = 'global';
  const disconnect = useCallback(() => {
    if (namespace) {
      if (!sockets[namespace]) return;
      sockets[namespace].disconnect();
      delete sockets[namespace];
    }
  }, [namespace]);

  if (sockets[namespace]) return [sockets[namespace], disconnect];
  if (namespace === 'global') {
    sockets[namespace] = io(chatSocketUrl, { transports: ['websocket'] });
  } else {
    sockets[namespace] = io(chatSocketUrl + '/' + namespace, {
      transports: ['websocket'],
      auth: {
        Authorization: `Bearer ${getAuthorization()}`,
      },
    });
  }
  return [sockets[namespace], disconnect];
};

const chatSocketUrl = 'ws://10.19.223.86:2229';

export default useChatSocket;
