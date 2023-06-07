import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';

import { sideBarState } from 'recoils/sideBar';

import { ChattingType, Participant } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';
import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import UserBox from 'components/channels/participants/UserBox';
import BasicButton from 'components/global/buttons/BasicButton';
import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

import styles from 'styles/channels/Participants.module.scss';

export default function Participants() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const setSideBar = useSetRecoilState(sideBarState);
  const { useInvitationModal } = useModalProvider();
  const { mutationDelete } = useCustomQuery();
  const { chatUsersGet } = useChatQuery(
    roomType as ChattingType,
    roomId as string
  );
  const channelLeaveMuatation = mutationDelete(
    `/channels/${roomId}/participants`,
    {
      onSuccess: () => {
        setSideBar(null);
        router.push('/channels');
      },
      onError: () => { },
    }
  );

  const { data, isLoading, isError } = chatUsersGet();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  const { me, participants } = data;

  const handleFriendInvite = () => {
    useInvitationModal('channel', roomId as string, data.participants);
  };

  const handleChannelLeave = () => {
    channelLeaveMuatation.mutate();
  };

  return (
    <div className={styles.participantsContainer}>
      <div className={styles.userList}>
        <UserBox user={me} />
        {participants.map((participant: Participant, i: number) => (
          <UserBox
            key={i}
            roomId={roomId as string}
            myRoleType={me.roleType}
            user={participant}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <BasicButton
          style='fit'
          color='transparent'
          handleButtonClick={handleFriendInvite}
        >
          <FiUserPlus />
        </BasicButton>
        <BasicButton
          style='fit'
          color='transparent'
          handleButtonClick={handleChannelLeave}
        >
          <MdLogout />
        </BasicButton>
      </div>
    </div>
  );
}
