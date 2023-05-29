export type ChatBoxType = 'chatBox' | 'myChatBox' | 'systemChatBox';

export interface ChatUser {
  imgUrl: string;
  nickname: string;
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
