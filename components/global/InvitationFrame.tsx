import useTranslation from 'next-translate/useTranslation';

import React, { ReactNode, useState } from 'react';

import { Friend } from 'types/friendTypes';

import useFriendsQuery from 'hooks/useFriendsQuery';

import ChannelInviteableFriendList from 'components/channels/ChannelInviteableFriendList';
import GameInviteableFriendList from 'components/game/GameInviteableFriendList';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import SearchBar from 'components/global/SearchBar';
import SocketManager from 'components/global/SocketManager';

import styles from 'styles/global/InvitationFrame.module.scss';

type InvitationFrameProps = {
  type: string;
  channelId?: string;
  gameMode?: string;
  participantNames?: string[];
};

export default function InvitationFrame({
  type,
  channelId = '',
  gameMode = '',
  participantNames,
}: InvitationFrameProps) {
  const { t } = useTranslation('common');
  const { allListGet } = useFriendsQuery();
  const [searchKey, setSearchKey] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const { isLoading, isError, error } = allListGet(setFriends);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  const filterChannelFriends = () => {
    return friends.filter(
      ({ nickname }) =>
        nickname.includes(searchKey) && !participantNames?.includes(nickname)
    );
  };

  const filterGameFriends = () => {
    return friends.filter(({ nickname }) => nickname.includes(searchKey));
  };

  const friendList: { [key: string]: ReactNode } = {
    channel: (
      <ChannelInviteableFriendList
        roomId={channelId}
        friends={filterChannelFriends()}
      />
    ),
    game: (
      <>
        <SocketManager namespace={'friends'} />
        <GameInviteableFriendList
          mode={gameMode}
          friends={filterGameFriends()}
        />
      </>
    ),
  };

  if (!friendList.hasOwnProperty(type)) return null;

  return (
    <div className={styles.InvitationFrameContainer}>
      <SearchBar
        inputId='searchFriendInput'
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        placeHolder={t('search by nickname')}
      />
      <div className={styles.friendList}>{friendList[type]}</div>
    </div>
  );
}
