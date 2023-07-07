import { Socket, io } from 'socket.io-client';

import { useCallback } from 'react';

import getAuthorization from 'utils/cookieUtil';

const sockets: { [key: string]: Socket } = {};
const useGameSocket = (namespace: string): [Socket, () => void] => {
  const disconnect = useCallback(() => {
    if (!sockets[namespace]) return;
    sockets[namespace].disconnect();
    delete sockets[namespace];
  }, [namespace]);

  if (sockets[namespace]) return [sockets[namespace], disconnect];
  let url;
  if (namespace === 'matching') url = gameSocketUrl;
  else url = gameSocketUrl + '/' + namespace;

  sockets[namespace] = io(url, {
    autoConnect: false,
    transports: ['websocket'],
    auth: {
      Authorization: `Bearer ${getAuthorization()}`,
    },
  });
  return [sockets[namespace], disconnect];
};

const gameSocketUrl = 'ws://10.19.223.86:2222';

export default useGameSocket;
