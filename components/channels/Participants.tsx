import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';
import { sideBarState } from 'recoils/sideBar';

import useChatQuery from 'hooks/useChatQuery';
import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import ChannelRoleButtons from 'components/channels/ChannelRoleButtons';
import BasicButton from 'components/global/buttons/BasicButton';

import { ChattingType, Participant } from 'types/chatTypes';

import { FaCrown } from 'react-icons/fa';
import { TbCrown } from 'react-icons/tb';
import { FiUserPlus } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';

import styles from 'styles/channels/Participants.module.scss';

export default function Participants() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const setSideBar = useSetRecoilState(sideBarState);
  const { useProfileModal } = useModalProvider();
  const { mutationDelete } = useCustomQuery();
  const { chatUsersGet } = useChatQuery(
    roomType as ChattingType,
    roomId as string
  );
  const { mutate } = mutationDelete(`/channels/${roomId}/participants`, {
    onSuccess: () => {
      setSideBar(null);
      router.push('/channels');
    },
    onError: () => { },
  });

  const { data, isLoading, isError } = chatUsersGet();
  if (isLoading) return null;
  if (isError) return null;

  const isOwner = data.me.roleType === 'owner';
  const isAdmin = data.me.roleType === 'admin';

  const handleParticipantClick = (nickname: string) => {
    useProfileModal(nickname);
  };

  const handleChannelLeave = () => {
    mutate();
  }

  return (
    <div className={styles.participantsContainer}>
      <div className={styles.participant}>
        <img src={data.me.imgUrl} className={styles.profileImage} onClick={() => handleParticipantClick(data.me.nickname)} />
        <div>
          <span>{data.me.nickname}</span>
          {isOwner ? <FaCrown /> : isAdmin ? <TbCrown /> : null}
        </div>
      </div>

      {data.participants.map((participant: Participant) => (
        <div key={participant.nickname} className={styles.participant}>
          <img src={participant.imgUrl} className={styles.profileImage} onClick={() => handleParticipantClick(participant.nickname)} />
          <div>
            <span>{participant.nickname}</span>
            {participant.roleType === 'owner' ? <FaCrown /> : participant.roleType === 'admin' ? <TbCrown /> : null}
            <ChannelRoleButtons
              roomId={roomId as string}
              role={data.me.roleType}
              participant={participant} />
          </div>
        </div>
      ))}
      <div className={styles.footer}>
        <BasicButton
          style='transparent'
          color='none'
          handleButtonClick={() => { }}
        >
          Invite Friend
          <FiUserPlus />
        </BasicButton>
        <BasicButton
          style='transparent'
          color='none'
          handleButtonClick={handleChannelLeave}
        >
          Leave Channel
          <MdLogout />
        </BasicButton>
      </div>
    </div>
  );
}
