export type InvitationType = 'channel' | 'game';

export interface Invitation {
  id: string;
  from: string;
  createdAt: Date;
  channelId?: string;
  channelName?: string;
  gameType?: 'ladder' | 'normal';
}

export interface Invitations {
  invitations: Invitation[];
}

export interface DMRoom {
  nickname: string;
  imgUrl: string;
  newChats: number;
}

export interface ChatList {
  chatList: DMRoom[];
}
