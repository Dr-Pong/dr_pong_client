import React from 'react';
import {
  IoIosChatboxes,
  IoMdAdd,
  IoMdCheckmark,
  IoMdClose,
  IoMdMore,
} from 'react-icons/io';

import { FriendTab } from 'types/friendTypes';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/FriendButtons.module.scss';

export default function FriendButtons({
  tab,
  nickname,
}: {
  tab: FriendTab;
  nickname: string;
}) {
  const goDM = () => {};

  const dropDown = () => {};

  const accept = () => {};

  const reject = () => {};

  const unblock = () => {};

  const add = () => {};

  const buttons: {
    [key: string]: { content: string | React.ReactNode; handler: () => void }[];
  } = {
    friend: [
      { content: <IoIosChatboxes />, handler: goDM },
      { content: <IoMdMore />, handler: dropDown },
    ],
    request: [
      { content: <IoMdCheckmark />, handler: accept },
      { content: <IoMdClose />, handler: reject },
    ],
    block: [{ content: <IoMdClose />, handler: unblock }],
    find: [{ content: <IoMdAdd />, handler: add }],
  };
  return (
    <div className={styles.buttons}>
      {buttons[tab].map(({ content, handler }) => (
        <BasicButton
          key={nickname + content}
          color={'opaque'}
          style={'round'}
          handleButtonClick={handler}
        >
          {content}
        </BasicButton>
      ))}
    </div>
  );
}
