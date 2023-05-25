import { Invitation } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import InvitationBox from './InvitationBox';

export default function Invitations() {
  const { get } = useCustomQuery();
  const gameInvitationsGet = get(
    ['notificationsGames'],
    '/users/notifications/games'
  );
  const channelInvitationsGet = get(
    ['notificationsChannels'],
    '/users/notifications/channels'
  );

  if (gameInvitationsGet.isLoading || channelInvitationsGet.isLoading)
    return null;

  const invitations: Invitation[] = [
    ...gameInvitationsGet.data.invitations,
    ...channelInvitationsGet.data.invitations,
  ].sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    else if (a.createdAt < b.createdAt) return 1;
    return 0;
  });

  return (
    <div>
      {invitations.map((el, i) => {
        const type = 'channelId' in el ? 'channel' : 'game';
        return (
          <div key={i}>
            <InvitationBox type={type} invitation={el} />
          </div>
        );
      })}
    </div>
  );
}
