import { useRecoilValue } from 'recoil';

import React, { useEffect } from 'react';

import { loginState } from 'recoils/login';

import useChatSocket from 'hooks/useChatSocket';
import useGameSocket from 'hooks/useGameSocket';

export type SocketNamespace = 'friends' | 'global' | 'channel' | 'dm' | 'game';
export default function SocketManager({
  namespace,
}: {
  namespace: SocketNamespace;
}) {
  const login = useRecoilValue(loginState);
  const [chatSocket, disconnectChatSocket] = useChatSocket(namespace);
  const [gameSocket, disconnectGameSocket] = useGameSocket(namespace);

  if (login) {
    if (namespace === 'game' && gameSocket.disconnected) gameSocket.connect();
    else if (chatSocket.disconnected) chatSocket.connect();
  }

  useEffect(() => {
    return () => {
      if (namespace === 'game') disconnectGameSocket();
      else disconnectChatSocket();
    };
  }, [login]);

  return <></>;
}
