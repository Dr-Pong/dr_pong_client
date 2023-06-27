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

  useEffect(() => {
    if (login && !socket?.connected) socket.connect();
    if (!login && socket?.connected) socket.disconnect();
    return () => {
      disconnectSocket();
    };
  }, [login]);
  return <></>;
}
