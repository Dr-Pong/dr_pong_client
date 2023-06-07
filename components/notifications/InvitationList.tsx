import { useEffect, useState } from 'react';

import { Invitation, Invitations } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import InvitationBox from 'components/notifications/InvitationBox';
import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

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

  const deleteInvitation = (id: string) => {
    setCombination((combination) =>
      combination.filter((invitation) => invitation.id !== id)
    );
  };

  if (gameInvitationsGet.isLoading || channelInvitationsGet.isLoading) return <LoadingSpinner />;
  if (gameInvitationsGet.isError || channelInvitationsGet.isError) return <ErrorRefresher />;

  return (
    <div>
      {combination.map((el, i) => {
        const type = 'channelId' in el ? 'channel' : 'game';
        return (
          <InvitationBox
            key={i}
            type={type}
            invitation={el}
            deleteInvitation={deleteInvitation}
          />
        );
      })}
    </div>
  );
}
