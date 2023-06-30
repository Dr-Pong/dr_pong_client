import { useRecoilValue } from 'recoil';

import React, { useEffect } from 'react';

import { loginState } from 'recoils/login';

import useChatSocket from 'hooks/useChatSocket';

export type SocketNamespace = 'friends' | 'global' | 'channel' | 'dm';
export default function SocketManager({
  namespace,
}: {
  namespace: SocketNamespace;
}) {
  const login = useRecoilValue(loginState);
  const [socket, disconnectSocket] = useChatSocket(namespace);

  if (login && socket.disconnected) {
    socket.connect();
  }

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [login]);

  return <></>;
}
