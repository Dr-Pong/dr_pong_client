import React from 'react';
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { IoChatbox } from 'react-icons/io5';

import { FriendBoxType } from 'types/friendTypes';

import useRelationButtons from 'hooks/useRelationButtons';

import styles from 'styles/friends/FriendButtons.module.scss';

type FriendButtonsProps = {
  type: FriendBoxType;
  nickname: string;
};

export default function FriendButtons({ type, nickname }: FriendButtonsProps) {
  const {
    directMessage,
    dropdown,
    acceptFriendRequest,
    rejectFriendRequest,
    unblockUser,
    addFriend,
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
    none: [],
  };

  return (
    <div className={styles.friendButtonsWrap}>
      {buttons[type].map((c, i) => (
        <div key={i}>{c}</div>
      ))}
    </div>
  );
}
