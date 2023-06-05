import useRelationButtons from 'hooks/useRelationButtons';

import { Participant } from 'types/chatTypes';
import { ButtonDesign } from 'types/buttonTypes';

import { FaBan } from 'react-icons/fa';
import { TbCrown, TbCrownOff } from 'react-icons/tb';
import { GiHighKick } from 'react-icons/gi';
import { BsFillVolumeUpFill, BsVolumeMuteFill } from 'react-icons/bs';

import styles from 'styles/channels/ChannelRoleButtons.module.scss';

const buttonDesign: ButtonDesign = {
  style: 'transparent',
  color: 'none',
};

export default function ChannelRoleButtons({
  roomId,
  myRoleType,
  participant
}: {
  roomId: string,
  myRoleType: string,
  participant: Participant
}) {
  const paths = {
    admin: `/channels/${roomId}/admin`,
    kick: `/channels/${roomId}/kick`,
    ban: `/channels/${roomId}/ban`,
    mute: `/channels/${roomId}/mute`,
  };
  const { channelRoleEvent }
    = useRelationButtons(buttonDesign, participant.nickname);
  const buttons: { [key: string]: JSX.Element[]; } = {
    owner: [
      participant.roleType === 'admin'
        ? channelRoleEvent(<TbCrownOff />, paths.admin, 'delete')
        : channelRoleEvent(<TbCrown />, paths.admin, 'post'),
      channelRoleEvent(<GiHighKick />, paths.kick, 'post'),
      channelRoleEvent(<FaBan />, paths.ban, 'post'),
      participant.isMuted
        ? channelRoleEvent(<BsVolumeMuteFill />, paths.mute, 'delete')
        : channelRoleEvent(<BsFillVolumeUpFill />, paths.mute, 'post'),
    ],
    admin: [
      channelRoleEvent(<GiHighKick />, paths.kick, 'post'),
      channelRoleEvent(<FaBan />, paths.ban, 'post'),
      participant.isMuted
        ? channelRoleEvent(<BsVolumeMuteFill />, paths.mute, 'delete')
        : channelRoleEvent(<BsFillVolumeUpFill />, paths.mute, 'post'),
    ],
  };

  return (
    <div className={styles.buttons}>
      {(myRoleType === 'owner'
        || (myRoleType === 'admin' && participant.roleType === 'normal')) &&
        buttons[myRoleType].map((c) => c)}
    </div>
  )
}
