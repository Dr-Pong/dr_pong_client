export type ChatType = 'me' | 'others' | 'system' | 'fail';
export type RoomType = 'channel' | 'dm';
export type RoleType = 'owner' | 'admin' | 'normal';

export interface ChatUser {
  imgUrl: string;
  nickname: string;
}

export interface UserImageMap {
  [key: string]: string;
}

export interface Chat {
  id: string;
  message: string;
  nickname?: string;
  time?: Date;
  type: ChatType;
}

export interface ChatResponse {
  chats: Chat[];
  isLastPage: boolean;
}

export interface Participant {
  nickname: string;
  imgUrl: string;
  roleType: RoleType;
  isMuted: boolean;
}

export interface ParticipantsResponse {
  me: Participant;
  participants: Participant[];
  headCount: number;
  maxCount: number;
}
