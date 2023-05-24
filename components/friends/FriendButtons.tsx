import React from 'react';
import {
  IoIosChatboxes,
  IoMdAdd,
  IoMdCheckmark,
  IoMdClose,
} from 'react-icons/io';

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
    all: [directMessage(<IoIosChatboxes />), dropdown()],
    pending: [
      acceptFriendRequest(<IoMdCheckmark />),
      rejectFriendRequest(<IoMdClose />),
    ],
    block: [unblockUser(<IoMdClose />)],
    find: [addFriend(<IoMdAdd />)],
  };
  return <div className={styles.buttons}>{buttons[tab].map((c) => c)}</div>;
}
