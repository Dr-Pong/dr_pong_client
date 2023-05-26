export type Activity = 'online' | 'offline' | 'inGame';
export type FriendTab = 'all' | 'pending' | 'block';
export type SearchUser = 'find';

export type Friend = {
  nickname: string;
  imgUrl: string;
  status?: Activity;
};

export type UserListResponse = {
  users: Friend[];
};
