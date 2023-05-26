export interface Invitation {
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
