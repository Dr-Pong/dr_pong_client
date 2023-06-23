import { InvitationType } from 'types/notificationTypes';

export type Activity = 'online' | 'offline' | 'inGame';
export type FriendTab = 'all' | 'pending' | 'blocked';
export type FriendBoxType = FriendTab | InvitationType | 'add' | 'none';

export type Friend = {
  nickname: string;
  imgUrl: string;
};

export type UserListResponse = {
  users: Friend[];
};

export type Statuses = {
  [nickname: string]: Activity;
};
