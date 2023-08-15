export type Activity = 'online' | 'offline' | 'inGame';
export type FriendTab = 'all' | 'pending' | 'blocked';
export type UserInteraction =
  | 'friendAdd'
  | 'friendDelete'
  | 'friendAccept'
  | 'friendReject'
  | 'block'
  | 'unblock';

export interface Friend {
  nickname: string;
  imgUrl: string;
}

export interface UserListResponse {
  users: Friend[];
}

export interface Statuses {
  [nickname: string]: Activity;
}
