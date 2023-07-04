import Link from 'next/link';

import React, { ReactNode } from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { IoChatbox } from 'react-icons/io5';

import { ButtonDesign } from 'types/buttonTypes';
import { FriendTab } from 'types/friendTypes';

import FriendDropdown from 'components/friends/FriendDropdown';
import RelationButton from 'components/friends/RelationButton';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/FriendButtons.module.scss';

type FriendButtonsProps = {
  tab: FriendTab;
  nickname: string;
};

const button: ButtonDesign = {
  style: 'round',
  color: 'opaque',
};

export default function FriendButtons({ tab, nickname }: FriendButtonsProps) {
  const buttons: { [key: string]: ReactNode } = {
    directMessage: (
      <BasicButton style='round' color='opaque'>
        <Link href={`/chats/dm/${nickname}`}>
          <IoChatbox className={styles.chatBoxIcon} />
        </Link>
      </BasicButton>
    ),
    dropdown: (
      <FriendDropdown key={`${nickname}dropdown`} nickname={nickname} />
    ),
    friendAccept: (
      <RelationButton button={button} type='friendAccept' target={nickname}>
        <IoMdCheckmark />
      </RelationButton>
    ),
    friendReject: (
      <RelationButton button={button} type='friendReject' target={nickname}>
        <IoMdClose />
      </RelationButton>
    ),
    unblock: (
      <RelationButton button={button} type='unblock' target={nickname}>
        <IoMdClose />
      </RelationButton>
    ),
  };

  const friendTabs: { [key: string]: string[] } = {
    all: ['directMessage', 'dropdown'],
    pending: ['friendAccept', 'friendReject'],
    blocked: ['unblock'],
  };

  return (
    <div className={styles.friendButtonsWrap}>
      {friendTabs[tab as string].map((buttonName, i) => (
        <div key={i}>{buttons[buttonName]}</div>
      ))}
    </div>
  );
}
