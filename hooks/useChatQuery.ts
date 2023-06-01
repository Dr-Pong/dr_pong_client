import { useInfiniteQuery } from 'react-query';

import {
  ChattingType,
  ParticipantsResponse,
  RawChat,
  UserImageMap,
} from 'types/chatTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import instance from 'utils/axios';

import { DetailDto } from 'components/myPage/profile/ProfileCard';

const useChatQuery = (chattingType: ChattingType, roomId: string) => {
  const { get } = useCustomQuery();

  const getChatUsers = (setChatUsers: (u: UserImageMap) => void) => {
    if (chattingType === 'dm') {
      const friendDetailToChatUser = (data: DetailDto) => {
        const { url } = data.image;
        setChatUsers({ [roomId]: url });
      };
      return get(
        'currentDMFriend',
        `/users/${roomId}/detail`,
        friendDetailToChatUser
      );
    }

    const participantsToChatUsers = (data: ParticipantsResponse) => {
      const chatUsers: UserImageMap = {};
      data.participants.map((p) => {
        const { nickname, imgUrl } = p;
        chatUsers[nickname] = imgUrl;
      });
      setChatUsers(chatUsers);
    };
    return get(
      'currentChannelParticipants',
      `/channels/${roomId}/participants`,
      participantsToChatUsers
    );
  };

  const getChats = (parseChats: (rawChats: RawChat[]) => void) => {
    const fetchChats = async (key: any, offset?: string) => {
      const count = 20; // Set your desired count value here
      let path =
        chattingType === 'dm'
          ? `/users/friends/${roomId}/chats?count=${count}`
          : `/channels/${roomId}/chats?count=${count}`;

      if (offset) {
        path += `&offset=${offset}`;
      }

      const { data } = await instance.get(path);
      return data;
    };

    return useInfiniteQuery(
      'chats',
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
          parseChats(newChats);
        },
        refetchOnMount: 'always',
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  };

  return { getChatUsers, getChats };
};

export default useChatQuery;
