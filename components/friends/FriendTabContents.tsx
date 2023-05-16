import React, { useState } from 'react';

import { Friend, FriendTab, UserListResponse } from 'types/friendTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import FriendBox from 'components/friends/FriendBox';
import SearchableList from 'components/friends/SearchableList';

export default function FriendTabContents({ tab }: { tab: FriendTab }) {
  const { get } = useCustomQuery();
  const path: { [key: string]: string } = {
    friend: '/users/friends',
    request: '/users/friends/pendings',
    block: '/blocks',
  };
  const [friends, setFriends] = useState<Friend[]>([]);
  const userUnboxer = (data: UserListResponse) => setFriends(data.users);
  const { isLoading, isError } = get(tab, path[tab], userUnboxer);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(friends);
  return (
    <div>
      <SearchableList
        units={friends.map((friend) => (
          <FriendBox key={friend.nickname} tab={tab} friend={friend} />
        ))}
      />
    </div>
  );
}
