import { Dispatch, SetStateAction } from 'react';

import { Invitations } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

const useFriendsQuery = () => {
  const { get, queryClient } = useCustomQuery();

  const notificationNewDotGet = (
    setNewDot: Dispatch<SetStateAction<boolean>>
  ) => {
    const friendNotificationGet = get(
      ['notificationDot', 'friends'],
      '/users/notifications/friends',
      (data: { requestCount: number }) => {
        setNewDot(data.requestCount > 0);
      }
    );
    const gameInvitationsGet = get(
      ['notificationDot', 'games'],
      '/users/notifications/games',
      (data: Invitations) => {
        setNewDot((prev) => {
          return prev || data.invitations.length > 0;
        });
      }
    );
    const channelInvitationsGet = get(
      ['notificationDot', 'channels'],
      '/users/notifications/channels',
      (data: Invitations) => {
        setNewDot((prev) => {
          return prev || data.invitations.length > 0;
        });
      }
    );

    const isLoading =
      friendNotificationGet.isLoading ||
      gameInvitationsGet.isLoading ||
      channelInvitationsGet.isLoading;
    const isError =
      friendNotificationGet.isError ||
      gameInvitationsGet.isError ||
      channelInvitationsGet.isError;

    return { isLoading, isError };
  };

  const directMessageNewDotGet = (
    setNewDot: Dispatch<SetStateAction<boolean>>
  ) => {
    const { isLoading, isError } = get(
      'hasNewChat',
      '/users/friends/chats/new',
      ({ hasNewChat }: { hasNewChat: boolean }) => {
        setNewDot(hasNewChat);
      }
    );
    return { isLoading, isError };
  };

  return { notificationNewDotGet, directMessageNewDotGet, queryClient };
};

export default useFriendsQuery;
