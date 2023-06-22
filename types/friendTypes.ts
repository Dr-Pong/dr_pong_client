import { InvitationType } from 'types/notificationTypes';

export type Activity = 'online' | 'offline' | 'inGame';
export type FriendTab = 'all' | 'pending' | 'blocked';
export type FriendBoxType = FriendTab | InvitationType | 'add' | 'none';

export type Friend = {
  nickname: string;
  imgUrl: string;
  status?: Activity;
};

export type UserListResponse = {
  users: Friend[];
};
