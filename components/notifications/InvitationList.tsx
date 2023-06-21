import React, { useEffect, useState } from 'react';

import { Invitation, Invitations } from 'types/notificationTypes';

import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import InvitationBox from 'components/notifications/InvitationBox';

import styles from 'styles/notifications/Notifications.module.scss';


export default function InvitationList() {
  const [channelInvitations, setChannelInvitations] = useState<Invitations>({
    invitations: [],
  });
  const [gameInvitations, setGameInvitations] = useState<Invitations>({
    invitations: [],
  });
  const [combination, setCombination] = useState<Invitation[]>([]);
  const { get } = useCustomQuery();
  const gameInvitationsGet = get(
    ['notificationsGames'],
    '/users/notifications/games',
    setGameInvitations
  );
  const channelInvitationsGet = get(
    ['notificationsChannels'],
    '/users/notifications/channels',
    setChannelInvitations
  );
  const [chatSocket] = useChatSocket();

  useEffect(() => {
    chatSocket.on('invite', (invitation: Invitation) => {
      setChannelInvitations((prev) => {
        return {
          invitations: [...prev.invitations, invitation],
        };
      });
    });
    return () => {
      chatSocket.off('invite');
    };
  }, []);

  useEffect(() => {
    setCombination(
      sortInvitationsByTime(
        channelInvitations?.invitations,
        gameInvitations?.invitations
      )
    );
  }, [channelInvitations, gameInvitations]);

  const sortInvitationsByTime = (
    channels: Invitation[],
    games: Invitation[]
  ) => {
    return games.concat(channels).sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      else if (a.createdAt < b.createdAt) return 1;
      return 0;
    });
  };

  if (gameInvitationsGet.isLoading || channelInvitationsGet.isLoading)
    return <LoadingSpinner />;
  if (gameInvitationsGet.isError || channelInvitationsGet.isError)
    return <ErrorRefresher />;

  return (
    <div className={styles.invitationsWrap}>
      {combination.map((el) => {
        const type = 'channelId' in el ? 'channel' : 'game';
        return <InvitationBox key={el.id} type={type} invitation={el} />;
      })}
    </div>
  );
}
