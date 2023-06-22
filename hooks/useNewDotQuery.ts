import { Dispatch, SetStateAction } from 'react';

import { ChatList, Invitations } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

const useFriendsQuery = () => {
  const { get } = useCustomQuery();

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
      ['chatList'],
      '/users/friends/chatlist',
      (data: ChatList) => {
        const newDot = data.chatList?.some((chat) => chat.newChats > 0);
        setNewDot(newDot);
      }
    );
    return { isLoading, isError };
  };

  return { notificationNewDotGet, directMessageNewDotGet };
};

export default useFriendsQuery;
