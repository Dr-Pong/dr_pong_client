import useTranslation from 'next-translate/useTranslation';

import React, { useState } from 'react';

import { Participant } from 'types/chatTypes';
import { Friend } from 'types/friendTypes';

import useChatQuery from 'hooks/useChatQuery';
import useFriendsQuery from 'hooks/useFriendsQuery';

import ChannelInvitableFriendList from 'components/channels/ChannelInvitableFriendList';
import GameInvitableFriendList from 'components/game/GameInvitableFriendList';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import SearchBar from 'components/global/SearchBar';
import SocketManager from 'components/global/SocketManager';

import styles from 'styles/global/InvitationFrame.module.scss';

type InvitationFrameProps = {
  type: 'game' | 'channel';
  channelId?: string;
  gameMode?: string;
};

export default function InvitationFrame({
  type,
  channelId = '',
  gameMode = '',
}: InvitationFrameProps) {
  const { t } = useTranslation('common');
  const { allListGet } = useFriendsQuery();
  const [searchKey, setSearchKey] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const { isLoading, isError, error } = allListGet(setFriends);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  return (
    <div className={styles.invitationFrameContainer}>
      <SearchBar
        inputId='searchFriendInput'
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        placeHolder={t('search by nickname')}
      />
      {type === 'channel' ? (
        <ChannelInvitationFrame
          channelId={channelId}
          searchKey={searchKey}
          friends={friends}
        />
      ) : (
        <GameInvitationFrame
          gameMode={gameMode}
          searchKey={searchKey}
          friends={friends}
        />
      )}
    </div>
  );
}

function ChannelInvitationFrame({
  channelId,
  searchKey,
  friends,
}: {
  channelId: string;
  searchKey: string;
  friends: Friend[];
}) {
  const { participantsGet } = useChatQuery('channel', channelId);

  const { data, isLoading, isError, error } = participantsGet();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  const participants = data.participants.map((p: Participant) => p.nickname);

  const filterChannelFriends = () => {
    return friends.filter(
      ({ nickname }) =>
        nickname.includes(searchKey) && !participants?.includes(nickname)
    );
  };

  return (
    <div className={styles.friendList}>
      <ChannelInvitableFriendList
        roomId={channelId}
        friends={filterChannelFriends()}
      />
    </div>
  );
}

function GameInvitationFrame({
  gameMode,
  searchKey,
  friends,
}: {
  gameMode: string;
  searchKey: string;
  friends: Friend[];
}) {
  const filterGameFriends = () => {
    return friends.filter(({ nickname }) => nickname.includes(searchKey));
  };

  return (
    <div className={styles.friendList}>
      <SocketManager namespace={'friends'} />
      <GameInvitableFriendList mode={gameMode} friends={filterGameFriends()} />
    </div>
  );
}
