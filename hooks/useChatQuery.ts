import { useInfiniteQuery } from 'react-query';

import {
  Chat,
  ParticipantsResponse,
  RoomType,
  UserImageMap,
} from 'types/chatTypes';
import { DetailDto } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import instance from 'utils/axios';

const useChatQuery = (roomType: RoomType, roomId: string) => {
  const { get, mutationPost } = useCustomQuery();

  const chatUsersGet = (setChatUsers?: (u: UserImageMap) => void) => {
    const friendDetailToChatUser = (data: DetailDto) => {
      setChatUsers?.({ [roomId]: data.image.url });
    };

    const participantsToChatUsers = (data: ParticipantsResponse) => {
      const chatUsers: UserImageMap = {};

      data.participants.forEach((p) => {
        const { nickname, imgUrl } = p;
        chatUsers[nickname] = imgUrl;
      });
      setChatUsers?.(chatUsers);
    };

    return roomType === 'dm'
      ? get('DMFriend', `/users/${roomId}/detail`, friendDetailToChatUser)
      : get(
        'channelParticipants',
        `/channels/${roomId}/participants`,
        participantsToChatUsers
      );
  };

  const chatsGet = (handleChatJoin: (chats: Chat[]) => void, count: number) => {
    const fetchChats = async (key: any, offset?: string) => {
      let path =
        roomType === 'dm'
          ? `/users/friends/${roomId}/chats?count=${count}`
          : `/channels/${roomId}/chats?count=${count}`;

      const { data } = await instance.get(
        path + (offset ? `&offset=${offset}` : '')
      );
      return data;
    };

    return useInfiniteQuery(
      ['chats', roomId],
      async ({ pageParam }) => {
        const offset = pageParam;
        return fetchChats(roomId, offset);
      },
      {
        getNextPageParam: (lastPage) => {
          const lastChat = lastPage.chats[lastPage.chats.length - 1];
          if (!lastChat) return undefined;
          return lastChat ? lastChat.id : undefined;
        },
        onSuccess: (data) => {
          if (data.pages.length === 0) return;
          const newChats = data.pages[data.pages.length - 1].chats;
          handleChatJoin(newChats);
        },
        refetchOnMount: 'always',
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      } //TODO: onError 처리해야함
    );
  };

  const postChatMutation = () => {
    const path =
      roomType === 'dm'
        ? `/users/friends/${roomId}/chats`
        : `/channels/${roomId}/chats`;

    return mutationPost(path, {});
  };

  return { chatUsersGet, chatsGet, postChatMutation };
};

export default useChatQuery;
