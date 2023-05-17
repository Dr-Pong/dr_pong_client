import React, { useState } from 'react';

import { Friend, FriendTab } from 'types/friendTypes';

import useFriendsQuery from 'hooks/useFriendsQuery';

import FriendBox from 'components/friends/FriendBox';
import SearchableList from 'components/friends/SearchableList';

export default function FriendTabContents({ tab }: { tab: FriendTab }) {
  const { getFriendList, getRequestList, getBlockList } = useFriendsQuery();

  const query = {
    friend: getFriendList,
    request: getRequestList,
    block: getBlockList,
  };

  const [friends, setFriends] = useState<Friend[]>([]);

  const { isLoading, isError } = query[tab](setFriends);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

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
