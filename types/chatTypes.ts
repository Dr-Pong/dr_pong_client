export type ChatType = 'me' | 'others' | 'system' | 'fail';
export type RoomType = 'channels' | 'dm';

export interface ChatUser {
  imgUrl: string;
  nickname: string;
}

export interface UserImageMap {
  [key: string]: string;
}

export interface Chat {
  id: number;
  message: string;
  nickname: string;
  time: Date;
  type: ChatType;
}

export interface ChatResponse {
  chats: Chat[];
  isLastPage: boolean;
}

export interface Participant {
  nickname: string;
  imgUrl: string;
  roleType: 'owner' | 'admin' | 'normal';
  isMuted: boolean;
}

export interface ParticipantsResponse {
  me: Participant;
  participants: Participant[];
  headCount: number;
  maxCount: number;
}
