import { useRecoilValue } from 'recoil';

import React, { useEffect } from 'react';

import { loginState } from 'recoils/login';

import useChatSocket from 'hooks/useChatSocket';
import useGameSocket from 'hooks/useGameSocket';

export type SocketNamespace =
  | 'friends'
  | 'global'
  | 'channel'
  | 'dm'
  | 'game'
  | 'matching';

export default function SocketManager({
  namespace,
}: {
  namespace: SocketNamespace;
}) {
  const login = useRecoilValue(loginState);
  const [chatSocket, disconnectChatSocket] = useChatSocket(namespace);
  const [gameSocket, disconnectGameSocket] = useGameSocket(namespace);

  if (login) {
    if (
      (namespace === 'game' || namespace === 'matching') &&
      gameSocket.disconnected
    )
      gameSocket.connect();
    else if (chatSocket.disconnected) chatSocket.connect();
  }

  useEffect(() => {
    if (namespace === 'friends' && chatSocket.disconnected) chatSocket.connect();
    return () => {
      if (namespace === 'game' || namespace === 'matching')
        disconnectGameSocket();
      else disconnectChatSocket();
    };
  }, [login]);

  return <></>;
}
