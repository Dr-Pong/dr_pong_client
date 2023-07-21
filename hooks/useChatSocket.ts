import { Socket, io } from 'socket.io-client';

import { useCallback } from 'react';

import getAuthorization from 'utils/cookieUtil';

import { SocketNamespace } from 'components/global/SocketManager';

const sockets: { [key: string]: Socket } = {};
const useChatSocket = (namespace: SocketNamespace): [Socket, () => void] => {
  const disconnect = useCallback(() => {
    if (!sockets[namespace]) return;
    sockets[namespace].disconnect();
    delete sockets[namespace];
  }, [namespace]);

  if (sockets[namespace]) return [sockets[namespace], disconnect];
  let url;
  if (namespace === 'global') url = chatSocketUrl;
  else url = chatSocketUrl + '/' + namespace;

  sockets[namespace] = io(url, {
    autoConnect: false,
    transports: ['websocket'],
    auth: {
      Authorization: `Bearer ${getAuthorization()}`,
    },
  });
  console.log('on io', sockets[namespace], getAuthorization());
  return [sockets[namespace], disconnect];
};

const chatSocketUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET;

export default useChatSocket;
