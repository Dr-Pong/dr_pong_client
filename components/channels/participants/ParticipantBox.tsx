import { BsFillVolumeUpFill, BsVolumeMuteFill } from 'react-icons/bs';
import { RiVipCrownFill, RiVipCrownLine } from 'react-icons/ri';
import { TbBan, TbCrown, TbCrownOff, TbShoe } from 'react-icons/tb';

import { ButtonDesign } from 'types/buttonTypes';
import { Participant } from 'types/chatTypes';

import useModalProvider from 'hooks/useModalProvider';
import useRelationButtons from 'hooks/useRelationButtons';

import styles from 'styles/channels/ParticipantBox.module.scss';

const buttonDesign: ButtonDesign = {
  style: 'fit',
  color: 'transparent',
};

type ParticipantBoxProps = {
  roomId?: string;
  myRoleType?: string;
  user: Participant;
};

export default function ParticipantBox({
  roomId,
  myRoleType,
  user,
}: ParticipantBoxProps) {
  const { nickname, imgUrl, roleType, isMuted } = user;
  const { useProfileModal } = useModalProvider();
  const { channelRoleEvent } = useRelationButtons(buttonDesign, nickname);

  const paths = {
    admin: `/channels/${roomId}/admin`,
    kick: `/channels/${roomId}/kick`,
    ban: `/channels/${roomId}/ban`,
    mute: `/channels/${roomId}/mute`,
  };

  const roleIcons: { [key: string]: React.ReactElement | null } = {
    owner: <RiVipCrownFill />,
    admin: <RiVipCrownLine />,
    normal: null,
  };

  const adminButtons = {
    owner: <></>,
    admin: channelRoleEvent(<TbCrownOff />, paths.admin, 'delete'),
    normal: channelRoleEvent(<TbCrown />, paths.admin, 'post'),
  };

  const muteButtons = {
    true: channelRoleEvent(<BsFillVolumeUpFill />, paths.mute, 'delete'),
    false: channelRoleEvent(<BsVolumeMuteFill />, paths.mute, 'post'),
  };

  const buttons: { [key: string]: JSX.Element[] } = {
    owner: [
      adminButtons[roleType],
      channelRoleEvent(<TbShoe />, paths.kick, 'delete'),
      channelRoleEvent(<TbBan />, paths.ban, 'post'),
      muteButtons[`${isMuted}`],
    ],
    admin:
      roleType === 'normal'
        ? [
            channelRoleEvent(<TbShoe />, paths.kick, 'delete'),
            channelRoleEvent(<TbBan />, paths.ban, 'post'),
            muteButtons[`${isMuted}`],
          ]
        : [],
    normal: [],
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
      {myRoleType && (
        <div className={styles.buttons}>
          {buttons[myRoleType].map((c) => c)}
        </div>
      )}
    </div>
  );
}
