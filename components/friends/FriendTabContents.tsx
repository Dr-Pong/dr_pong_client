import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { UseQueryResult } from 'react-query';

import { Friend, FriendTab } from 'types/friendTypes';

import useFriendsQuery from 'hooks/useFriendsQuery';
import useModalProvider from 'hooks/useModalProvider';

import FriendBox from 'components/friends/FriendBox';
import SearchableList from 'components/friends/SearchableList';
import BasicButton from 'components/global/buttons/BasicButton';

export default function FriendTabContents({ tab }: { tab: FriendTab }) {
  const { allListGet, pendingListGet, blockListGet } = useFriendsQuery();
  const { useFriendFinderModal } = useModalProvider();
  const popModalButton =
    tab === 'all' ? (
      <BasicButton
        style={'square'}
        color={'white'}
        handleButtonClick={useFriendFinderModal}
      >
        <IoMdAdd />
      </BasicButton>
    ) : null;
  const query: {
    [key: string]: (setBlocks: (f: Friend[]) => void) => UseQueryResult;
  } = {
    all: allListGet,
    pending: pendingListGet,
    block: blockListGet,
  };

  const [friends, setFriends] = useState<Friend[]>([]);

  const { isLoading, isError } = query[tab](setFriends);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <SearchableList
        haystack={friends.map((friend) => (
          <FriendBox key={friend.nickname} tab={tab} friend={friend} />
        ))}
        button={popModalButton}
      />
    </div>
  );
}
