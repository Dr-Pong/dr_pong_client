import { Dispatch, SetStateAction } from 'react';

import { ChatList, Invitations } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

const useFriendsQuery = () => {
  const { get } = useCustomQuery();

  const notificationNewDotGet = (setNewDot: (value: boolean) => void) => {
    const friendNotificationGet = get(
      ['notificationFriends'],
      '/users/notifications/friends',
      (data: { requestCount: number }) => {
        setNewDot(data.requestCount > 0);
      }
    );
    const gameInvitationsGet = get(
      ['notificationsGames'],
      '/users/notifications/games',
      (data: Invitations) => {
        setNewDot(data.invitations.length > 0);
      }
    );
    const channelInvitationsGet = get(
      ['notificationsChannels'],
      '/users/notifications/channels',
      (data: Invitations) => {
        setNewDot(data.invitations.length > 0);
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

    const newFriendNotification = friendNotificationGet.data?.requestCount > 0;
    const newGameInvitation = gameInvitationsGet.data?.invitations?.length > 0;
    const newChannelInvitation =
      channelInvitationsGet.data?.invitations?.length > 0;

    const newDot: boolean =
      newFriendNotification || newGameInvitation || newChannelInvitation;

    return { newDot, isLoading, isError };
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
