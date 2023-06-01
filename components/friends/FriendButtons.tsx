import React from 'react';
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { IoChatbox } from 'react-icons/io5';

import { ButtonDesign } from 'types/buttonTypes';
import { FriendTab, SearchUser } from 'types/friendTypes';

import useRelationButtons from 'hooks/useRelationButtons';

import styles from 'styles/friends/FriendButtons.module.scss';

const buttonDesign: ButtonDesign = {
  style: 'round',
  color: 'opaque',
};

export default function FriendButtons({
  tab,
  nickname,
}: {
  tab: FriendTab | SearchUser;
  nickname: string;
}) {
  const {
    directMessage,
    dropdown,
    acceptFriendRequest,
    rejectFriendRequest,
    addFriend,
    unblockUser,
  } = useRelationButtons(buttonDesign, nickname);

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
    block: [unblockUser(<IoMdClose />)],
    find: [addFriend(<IoMdAdd />)],
  };

  return (
    <div className={styles.friendButtonsContainer}>
      {buttons[tab].map((c) => c)}
    </div>
  );
}
