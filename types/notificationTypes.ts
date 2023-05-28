export interface Invitation {
  id: string;
  from: string;
  createdAt: Date;
  channelId?: number;
  channelName?: string;
}

export type DirectMessage = {
  nickname: string;
  imgUrl: string;
  newChats: number;
};
