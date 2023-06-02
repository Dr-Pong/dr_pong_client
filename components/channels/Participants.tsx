import { useRouter } from 'next/router';

import { FormEvent } from 'react';

import useChatQuery from 'hooks/useChatQuery';
import useModalProvider from 'hooks/useModalProvider';

import BasicButton from 'components/global/buttons/BasicButton';

import { ChattingType, Participant } from 'types/chatTypes';

import { FaCrown, FaBan } from 'react-icons/fa';
import { TbCrown, TbCrownOff } from 'react-icons/tb';
import { GiHighKick } from 'react-icons/gi';
import { BsFillVolumeUpFill, BsVolumeMuteFill } from 'react-icons/bs';
import { FiUserPlus } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';

import styles from 'styles/channels/Participants.module.scss';

type ButtonRole = 'admin' | 'kick' | 'ban' | 'mute' | 'unmute';

export default function Participants() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const { useProfileModal } = useModalProvider();

  const { chatUsersGet } = useChatQuery(
    roomType as ChattingType,
    roomId as string
  );

  const { data, isLoading, isError } = chatUsersGet();
  if (isLoading) return null;
  if (isError) return null;

  const isOwner = data.me.roleType === 'owner';
  const isAdmin = data.me.roleType === 'admin';

  const handleRoleEvent = (event: FormEvent<HTMLFormElement>, role: ButtonRole, nickname: string) => {
    // role 및 nickname에 따른 작업 수행
  };

  const renderButtons = (participant: Participant) => {
    if (isOwner || (isAdmin && participant.roleType === 'normal')) {
      return (
        <div className={styles.buttons}>
          {isOwner &&
            <BasicButton
              style='transparent'
              color='none'
              handleButtonClick={(event) => handleRoleEvent(event, 'admin', participant.nickname)}>
              {participant.roleType === 'admin' ? <TbCrownOff /> : <TbCrown />}
            </BasicButton>}
          <BasicButton style='transparent' color='none' handleButtonClick={(event) => handleRoleEvent(event, 'kick', participant.nickname)}>
            <GiHighKick />
          </BasicButton>
          <BasicButton style='transparent' color='none' handleButtonClick={(event) => handleRoleEvent(event, 'ban', participant.nickname)}>
            <FaBan />
          </BasicButton>
          <BasicButton
            style='transparent'
            color='none'
            handleButtonClick={(event) => handleRoleEvent(event, participant.isMuted ? 'unmute' : 'mute', participant.nickname)}
          >
            {participant.isMuted ? <BsVolumeMuteFill /> : <BsFillVolumeUpFill />}
          </BasicButton>
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
          {isOwner ? <FaCrown /> : isAdmin ? <TbCrown /> : null}
        </div>
      </div>

      {data.participants.map((participant: Participant) => (
        <div key={participant.nickname} className={styles.participant} onClick={() => handleParticipantClick(participant.nickname)}>
          <img src={participant.imgUrl} className={styles.profileImage} />
          <div>
            <span>{participant.nickname}</span>
            {participant.roleType === 'owner' ? <FaCrown /> : participant.roleType === 'admin' ? <TbCrown /> : null}
            {renderButtons(participant)}
          </div>
        </div>
      ))}
      <div className={styles.footer}>
        <BasicButton
          style='transparent'
          color='none'
          handleButtonClick={() => { }}
        >초대하기 <FiUserPlus />
        </BasicButton>
        <BasicButton
          style='transparent'
          color='none'
          handleButtonClick={() => { }}
        >나가기 <MdLogout />
        </BasicButton>
      </div>
    </div>
  );
}
