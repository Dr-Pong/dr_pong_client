import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import { sideBarState } from 'recoils/sideBar';

import { Invitation } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/notifications/Notifications.module.scss';

type InvitationBoxProps = {
  type: string;
  invitation: Invitation;
  deleteInvitation: (id: string) => void;
};

type InvitationProperty = {
  acceptPath: string;
  deletePath: string;
  notification: string;
};

export default function InvitationBox({
  type,
  invitation,
  deleteInvitation,
}: InvitationBoxProps) {
  const { t } = useTranslation('common');
  const setSideBar = useSetRecoilState(sideBarState);
  const { mutationPost, mutationDelete } = useCustomQuery();
  const { id, from, createdAt, channelId, channelName } = invitation;
  const invitationProperties: { [key: string]: InvitationProperty } = {
    channel: {
      acceptPath: `/channels/${channelId}/magicpass`,
      deletePath: `/users/notifications/channels/${id}`,
      notification: `"${from}" ${t('channelInv1')} "${channelName}" ${t(
        'channelInv2'
      )}`,
    },
    game: {
      acceptPath: ``, // todo
      deletePath: `/users/notifications/games/${id}`,
      notification: `"${from}" ${t('gameInv')}`,
    },
  };

  const invitationAcceptMutation = mutationPost(
    invitationProperties[type].acceptPath,
    {
      onSuccess: () => {
        setSideBar(null);
        // 채널로 이동
      },
      onError: () => {
        // 실패 toast
      },
    }
  );

  const invitationDeleteMutation = mutationDelete(
    invitationProperties[type].deletePath,
    {
      onSuccess: () => {
        deleteInvitation(id);
        // 알림 지우기
      },
      onError: () => {
        // 실패 toast
      },
    }
  );

  const handleInvitationAccept = () => {
    invitationAcceptMutation.mutate({});
  };

  const handleInvitationDelete = () => {
    invitationDeleteMutation.mutate();
  };

  return (
    <div className={styles.invitationBox}>
      <div className={styles.notification}>
        {invitationProperties[type].notification}
      </div>
      <div className={styles.buttons}>
        <BasicButton
          style='round'
          color='black'
          handleButtonClick={handleInvitationAccept}
        >
          <IoMdCheckmark />
        </BasicButton>
        <BasicButton
          style='round'
          color='black'
          handleButtonClick={handleInvitationDelete}
        >
          <IoMdClose />
        </BasicButton>
      </div>
    </div>
  );
}
