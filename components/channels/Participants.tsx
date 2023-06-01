import { useRouter } from 'next/router';

import { useState } from 'react';

import useChatQuery from 'hooks/useChatQuery';
import useModalProvider from 'hooks/useModalProvider';

import { ChattingType, Participant, ParticipantsResponse, UserImageMap } from 'types/chatTypes';

import { FaCrown, FaBan } from 'react-icons/fa';
import { RiVipCrownLine } from 'react-icons/ri';
import { GiHighKick } from 'react-icons/gi';
import { BsFillVolumeUpFill, BsVolumeMuteFill } from 'react-icons/bs';
import { FiUserPlus } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';

import styles from 'styles/channels/Participants.module.scss';

export default function Participants() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const [participants, setParticipants] = useState<ParticipantsResponse>();
  const [userImageMap, setUserImageMap] = useState<UserImageMap>({});
  const { useProfileModal } = useModalProvider();

  const { chatUsersGet } = useChatQuery(
    roomType as ChattingType,
    roomId as string
  );

  const { data, isLoading, isError } = chatUsersGet(setUserImageMap);
  if (isLoading) return null;
  if (isError) return null;

  const isOwner = data.me.roleType === 'owner';
  const isAdmin = data.me.roleType === 'admin';

  const renderButtons = (participant: Participant) => {
    if (isOwner || (isAdmin && participant.roleType === 'normal')) {
      return (
        <div className={styles.buttons}>
          {isOwner && <button><RiVipCrownLine /></button>}
          <button><GiHighKick /></button>
          <button><FaBan /></button>
          <button>{participant.isMuted ? <BsVolumeMuteFill /> : <BsFillVolumeUpFill />}</button>
        </div>
      );
    }
    return null;
  };

  const handleParticipantClick = (nickname: string) => {
    useProfileModal(nickname);
  };


  return (
    <div className={styles.participantsContainer}>
      <div className={styles.participant} onClick={() => handleParticipantClick(data.me.nickname)}>
        <img src={data.me.imgUrl} className={styles.profileImage} />
        <div>
          <span>{data.me.nickname}</span>
          {isOwner ? <FaCrown /> : isAdmin ? <RiVipCrownLine /> : null}
        </div>
      </div>

      {data.participants.map((participant: Participant) => (
        <div key={participant.nickname} className={styles.participant} onClick={() => handleParticipantClick(participant.nickname)}>
          <img src={participant.imgUrl} className={styles.profileImage} />
          <div>
            <span>{participant.nickname}</span>
            {participant.roleType === 'owner' ? <FaCrown /> : participant.roleType === 'admin' ? <RiVipCrownLine /> : null}
            {renderButtons(participant)}
          </div>
        </div>
      ))}
      <div className={styles.footer}>
        <button>초대하기 <FiUserPlus /></button>
        <button>나가기 <MdLogout /></button>
      </div>
    </div>
  );
}
