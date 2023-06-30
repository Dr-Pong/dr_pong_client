import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';

import { sideBarState } from 'recoils/sideBar';

import { Participant, RoomType } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';
import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import UserBox from 'components/channels/participants/UserBox';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/Participants.module.scss';

export default function Participants() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const setSideBar = useSetRecoilState(sideBarState);
  const { useInvitationModal } = useModalProvider();
  const { mutationDelete } = useCustomQuery();
  const { chatUsersGet } = useChatQuery(roomType as RoomType, roomId as string);

  const channelLeaveMutation = mutationDelete(
    `/channels/${roomId}/participants`,
    {
      onSuccess: () => {
        setSideBar(null);
        router.push('/channels');
      },
      onError: () => {},
    }
  );

  const { data, isLoading, isError, error } = chatUsersGet();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  const { me, participants } = data;

  const handleFriendInvite = () => {
    useInvitationModal('channel', roomId as string, data.participants);
  };

  const handleChannelLeave = () => {
    channelLeaveMutation.mutate();
  };

  return (
    <div className={styles.participantsContainer}>
      <div className={styles.userList}>
        <UserBox key={me?.nickname} user={me} />
        {participants?.map((participant: Participant, i: number) => (
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
