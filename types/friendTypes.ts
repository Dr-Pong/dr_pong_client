export type Activity = 'online' | 'offline' | 'inGame';
export type FriendTab = 'friend' | 'request' | 'block' | 'find';
export type Friend = {
  nickname: string;
  imgUrl: string;
  status?: Activity;
};
export type UserListResponse = {
  users: Friend[];
}