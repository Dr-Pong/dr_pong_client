export type Activity = 'online' | 'offline' | 'inGame';
export type FriendTab = 'friend' | 'request' | 'block';
export type Friend = {
  nickname: string;
  imgUrl: string;
  status?: Activity;
};
export type UserListResponse = {
  users: Friend[];
}