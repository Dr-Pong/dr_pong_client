import React from 'react';
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { IoChatbox } from 'react-icons/io5';

import { FriendBoxType } from 'types/friendTypes';

import useRelationButtons from 'hooks/useRelationButtons';

import styles from 'styles/friends/FriendButtons.module.scss';

type FriendButtonsProps = {
  type: FriendBoxType;
  nickname: string;
  mode?: string;
  roomId?: string;
};

export default function FriendButtons({
  type,
  nickname,
  mode,
  roomId,
}: FriendButtonsProps) {
  const { channelInvitation, gameInvitation } = useRelationButtons(
    { style: 'round', color: 'pink' },
    nickname
  );
  const {
    directMessage,
    dropdown,
    acceptFriendRequest,
    rejectFriendRequest,
    addFriend,
    unblockUser,
  } = useRelationButtons({ style: 'round', color: 'opaque' }, nickname);

  const buttons: {
    [key: string]: JSX.Element[];
  } = {
    all: [
      directMessage(<IoChatbox className={styles.chatBoxIcon} />),
      dropdown(),
    ],
    pending: [
      acceptFriendRequest(<IoMdCheckmark />),
      rejectFriendRequest(<IoMdClose />),
    ],
    blocked: [unblockUser(<IoMdClose />)],
    add: [addFriend(<IoMdAdd />)],
    game: [gameInvitation(<IoMdAdd />, mode || '')],
    channel: [channelInvitation(<IoMdAdd />, roomId || '')],
    none: [],
  };

  return (
    <div className={styles.friendButtonsContainer}>
      {buttons[type].map((c, i) => (
        <div key={i}>{c}</div>
      ))}
    </div>
  );
}
