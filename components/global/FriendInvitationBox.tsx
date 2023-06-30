import React from 'react';
import { IoMdAdd } from 'react-icons/io';

import { Activity, Friend, FriendBoxType } from 'types/friendTypes';

import useRelationButtons from 'hooks/useRelationButtons';

import FriendBox from 'components/friends/FriendBox';

import styles from 'styles/friends/FriendButtons.module.scss';

type InvitationBoxProps = {
  friend: Friend;
  status: Activity;
  type: FriendBoxType;
  invitationArg: string;
};
export default function FriendInvitationBox({
  friend,
  status,
  type,
  invitationArg,
}: InvitationBoxProps) {
  const { gameInvitation, channelInvitation } = useRelationButtons(
    { style: 'round', color: 'pink' },
    friend.nickname
  );
  const buttons: { [key: string]: JSX.Element[] } = {
    channel: [channelInvitation(<IoMdAdd />, invitationArg)],
    game: [gameInvitation(<IoMdAdd />, invitationArg)],
  };
  return (
    <FriendBox
      key={friend.nickname}
      type={type}
      friend={friend}
      status={status}
    >
      <div className={styles.friendButtonsWrap}>
        {buttons[type].map((c, i) => (
          <div key={i}>{c}</div>
        ))}
      </div>
    </FriendBox>
  );
}
