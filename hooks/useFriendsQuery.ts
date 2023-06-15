import { Friend, UserListResponse } from 'types/friendTypes';

import useCustomQuery from 'hooks/useCustomQuery';

const useFriendsQuery = () => {
  const { get } = useCustomQuery();

  const allListGet = (setFriends: (f: Friend[]) => void) => {
    const unboxer = (data: UserListResponse) =>
      setFriends(data.users.map((user) => ({ ...user, status: 'offline' })));
    return get('allfriends', '/users/friends', unboxer);
  };

  const pendingListGet = (setRequests: (f: Friend[]) => void) => {
    const unboxer = (data: UserListResponse) => setRequests(data.users);
    return get('pendings', '/users/friends/pendings', unboxer);
  };

  const blockListGet = (setBlocks: (f: Friend[]) => void) => {
    const unboxer = (data: UserListResponse) => setBlocks(data.users);
    return get('blocks', '/users/blocks', unboxer);
  };

  return { allListGet, pendingListGet, blockListGet };
};

export default useFriendsQuery;
