export type Activity = 'online' | 'offline' | 'inGame';
export type FriendTab = 'all' | 'pending' | 'blocked';
export type UserInteraction =
  | 'friendAdd'
  | 'friendDelete'
  | 'friendAccept'
  | 'friendReject'
  | 'block'
  | 'unblock';

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
