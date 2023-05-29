import {
  ChatBoxProps,
  ChatResponse,
  ChattingType,
  ParticipantsResponse,
  RawChat,
  UserImageMap,
} from 'types/chatTypes';

import useCustomQuery from 'hooks/useCustomQuery';

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

  const getChats = (dataToChatBoxes: (rawChats: RawChat[]) => void) => {
    const unboxer = (data: ChatResponse) => dataToChatBoxes(data.chats);

    if (chattingType === 'dm') {
      return get(
        'currentDMChats',
        `/users/friends/${roomId}/chats?count=40`,
        unboxer
      );
    } else {
      return get(
        'currentChannelChats',
        `/channels/${roomId}/chats?count=40`,
        unboxer
      );
    }
  };

  return { getChatUsers, getChats };
};

export default useChatQuery;
