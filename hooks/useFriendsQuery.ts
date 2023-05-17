import { Friend, UserListResponse } from 'types/friendTypes';

import useCustomQuery from 'hooks/useCustomQuery';

const useFriendsQuery = () => {
  const { get } = useCustomQuery();

  const getFriendList = (setFriends: (f: Friend[]) => void) => {
    const unboxer = (data: UserListResponse) =>
      setFriends(data.users.map((user) => ({ ...user, status: 'offline' })));
    return get('friends', '/users/friends', unboxer);
  };

  const getRequestList = (setRequests: (f: Friend[]) => void) => {
    const unboxer = (data: UserListResponse) => setRequests(data.users);
    return get('requests', '/users/friends/pendings', unboxer);
  };

  const getBlockList = (setBlocks: (f: Friend[]) => void) => {
    const unboxer = (data: UserListResponse) => setBlocks(data.users);
    return get('blocks', '/blocks', unboxer);
  };

  return { getFriendList, getRequestList, getBlockList };
};

export default useFriendsQuery;
