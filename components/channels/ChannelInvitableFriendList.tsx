import { IoMdAdd } from 'react-icons/io';

import { Friend } from 'types/friendTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import UserBox from 'components/global/UserBox';
import MutationButton from 'components/global/buttons/MutationButton';

import styles from 'styles/modals/Modal.module.scss';

type ChannelInvitableFriendListProps = {
  roomId: string;
  friends: Friend[];
};

export default function ChannelInvitableFriendList({
  roomId,
  friends,
}: ChannelInvitableFriendListProps) {
  const { mutationPost } = useCustomQuery();
  const channelInviteMutation = mutationPost(`invitations/channels/${roomId}`);

  return (
    <div className={styles.InvitableFriendList}>
      {friends.map((friend) => (
        <UserBox key={friend.nickname} type='invitation' friend={friend}>
          <MutationButton
            style='round'
            color='pink'
            mutationRequest={channelInviteMutation}
            body={{ nickname: friend.nickname }}
          >
            <IoMdAdd />
          </MutationButton>
        </UserBox>
      ))}
    </div>
  );
}
