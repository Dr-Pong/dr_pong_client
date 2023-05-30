export interface Invitation {
  id: string;
  from: string;
  createdAt: Date;
  channelId?: number;
  channelName?: string;
}

export interface Invitations {
  invitations: Invitation[];
}

export interface Friend {
  nickname: string;
  imgUrl: string;
  newChats: number;
}

export interface ChatList {
  chatList: Friend[];
}
