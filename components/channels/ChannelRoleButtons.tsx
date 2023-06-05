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

export default function ChannelRoleButtons({ roomId, myRoleType, participant }: { roomId: string, myRoleType: string, participant: Participant }) {
  const admin = `/channels/${roomId}/admin`;
  const kick = `/channels/${roomId}/kick`;
  const ban = `/channels/${roomId}/ban`;
  const mute = `/channels/${roomId}/mute`;
  const { channelRoleEvent } = useRelationButtons(buttonDesign, participant.nickname);
  const buttons: { [key: string]: JSX.Element[]; } = {
    owner: [
      participant.roleType === 'admin'
        ? channelRoleEvent(<TbCrownOff />, admin, 'delete')
        : channelRoleEvent(<TbCrown />, admin, 'post'),
      channelRoleEvent(<GiHighKick />, kick, 'post'),
      channelRoleEvent(<FaBan />, ban, 'post'),
      participant.isMuted
        ? channelRoleEvent(<BsVolumeMuteFill />, mute, 'delete')
        : channelRoleEvent(<BsFillVolumeUpFill />, mute, 'post'),
    ],
    admin: [
      channelRoleEvent(<GiHighKick />, kick, 'post'),
      channelRoleEvent(<FaBan />, ban, 'post'),
      participant.isMuted
        ? channelRoleEvent(<BsVolumeMuteFill />, mute, 'delete')
        : channelRoleEvent(<BsFillVolumeUpFill />, mute, 'post'),
    ],
  };

  return (
    <div className={styles.buttons}>
      {(myRoleType === 'owner' || (myRoleType === 'admin' && participant.roleType === 'normal')) &&
        buttons[myRoleType].map((c) => c)}
    </div>
  )
}
