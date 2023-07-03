import { ReactElement } from 'react';
import { RiVipCrownFill, RiVipCrownLine } from 'react-icons/ri';

import { Participant } from 'types/chatTypes';

import useModalProvider from 'hooks/useModalProvider';

import ParticipantButton from 'components/channels/participants/ParticipantButton';

import styles from 'styles/channels/ParticipantBox.module.scss';

type ParticipantBoxProps = {
  roomId: string;
  myRoleType: string;
  user: Participant;
};

export default function ParticipantBox({
  roomId,
  myRoleType,
  user,
}: ParticipantBoxProps) {
  const rolePriority: string[] = ['owner', 'admin', 'normal'];
  const { nickname, imgUrl, roleType, isMuted } = user;
  const { useProfileModal } = useModalProvider();

  const roleIcons: { [key: string]: ReactElement | null } = {
    owner: <RiVipCrownFill />,
    admin: <RiVipCrownLine />,
    normal: null,
  };

  const adminButtons: { [key: string]: JSX.Element } = {
    admin: (
      <ParticipantButton roomId={roomId} target={nickname} type='setAdmin' />
    ),
    normal: (
      <ParticipantButton roomId={roomId} target={nickname} type='setAdmin' />
    ),
  };

  const muteButtons = {
    true: <ParticipantButton roomId={roomId} target={nickname} type='unmute' />,
    false: <ParticipantButton roomId={roomId} target={nickname} type='mute' />,
  };

  const handleUserClick = () => {
    useProfileModal(nickname);
  };

  return (
    <div
      className={`${styles.userBoxContainer} ${!myRoleType && styles.myBox}`}
    >
      <img
        src={imgUrl}
        className={styles.profileImage}
        onClick={handleUserClick}
        alt='img'
      />
      <div className={styles.nickname}>
        <span>{nickname}</span>
        {roleIcons[roleType]}
      </div>
      {rolePriority.indexOf(myRoleType) < rolePriority.indexOf(roleType) && (
        <div className={styles.buttons}>
          {myRoleType === 'owner' &&
            roleType !== 'owner' &&
            adminButtons[roleType]}
          <ParticipantButton roomId={roomId} target={nickname} type='kick' />
          <ParticipantButton roomId={roomId} target={nickname} type='ban' />
          {muteButtons[`${isMuted}`]}
        </div>
      )}
    </div>
  );
}
