import { useRecoilState, useSetRecoilState } from 'recoil';

import React from 'react';
import {
  IoIosChatboxes,
  IoMdAdd,
  IoMdCheckmark,
  IoMdClose,
} from 'react-icons/io';

import { FriendTab, SearchUser } from 'types/friendTypes';

import FriendDropdown from 'components/friends/FriendDropdown';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/FriendButtons.module.scss';

export default function FriendButtons({
  tab,
  nickname,
}: {
  tab: FriendTab | SearchUser;
  nickname: string;
}) {
  const goDM = () => {};

  const accept = () => {};

  const reject = () => {};

  const unblock = () => {};

  const add = () => {};

  const buttons: {
    [key: string]: JSX.Element[];
  } = {
    friend: [
      <BasicButton
        key={nickname + 'DM'}
        color={'opaque'}
        style={'round'}
        handleButtonClick={goDM}
      >
        {<IoIosChatboxes />}
      </BasicButton>,
      <FriendDropdown key={nickname + 'dropdown'} nickname={nickname} />,
    ],
    request: [
      <BasicButton
        key={nickname + 'accept'}
        color={'opaque'}
        style={'round'}
        handleButtonClick={accept}
      >
        {<IoMdCheckmark />}
      </BasicButton>,
      <BasicButton
        key={nickname + 'reject'}
        color={'opaque'}
        style={'round'}
        handleButtonClick={reject}
      >
        {<IoMdClose />}
      </BasicButton>,
    ],
    block: [
      <BasicButton
        key={nickname + 'unblock'}
        color={'opaque'}
        style={'round'}
        handleButtonClick={unblock}
      >
        {<IoMdClose />}
      </BasicButton>,
    ],
    find: [
      <BasicButton
        key={nickname + 'add'}
        color={'opaque'}
        style={'round'}
        handleButtonClick={add}
      >
        {<IoMdAdd />}
      </BasicButton>,
    ],
  };
  return <div className={styles.buttons}>{buttons[tab].map((c) => c)}</div>;
}
