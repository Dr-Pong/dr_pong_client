export type ChatBoxType = 'chatBox' | 'myChatBox' | 'systemChatBox';
export type ChattingType = 'channels' | 'dm';

export interface ChatUser {
  imgUrl: string;
  nickname: string;
}

export interface UserImageMap {
  [key: string]: string;
}

export interface ChatBoxProps {
  chatUser?: ChatUser;
  message: string;
  time?: Date;
}

export interface RawChat {
  message: string;
  nickname: string;
  createdAt: Date;
}
export interface ChatResponse {
  chats: RawChat[];
  isLastPage: boolean;
}

export interface ParticipantsResponse {
  me: {
    nickname: string;
    imgUrl: string;
    roleType: 'owner' | 'admin' | 'normal';
    isMuted: boolean;
  };
  participants: {
    nickname: string;
    imgUrl: string;
    roleType: 'owner' | 'admin' | 'normal';
    isMuted: boolean;
  }[];
  headCount: string;
  maxCount: string;
}
