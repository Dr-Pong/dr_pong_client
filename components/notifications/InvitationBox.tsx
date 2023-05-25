import useTranslation from 'next-translate/useTranslation';

import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import { Invitation } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/notifications/Notifications.module.scss';

type InvitationBoxProps = {
  type: string;
  invitation: Invitation;
};

type InvitationProperty = {
  acceptPath: string;
  deletePath: string;
  notification: string;
};

export default function InvitationBox({
  type,
  invitation,
}: InvitationBoxProps) {
  const { t } = useTranslation('common');
  const { mutationPost, mutationDelete } = useCustomQuery();
  const invitationProperties: { [key: string]: InvitationProperty } = {
    channel: {
      acceptPath: `/channels/${invitation.channelId}/magicpass`,
      deletePath: ``,
      notification: `"${invitation.from}" ${t('channelInv1')} "${
        invitation.channelName
      }" ${t('channelInv2')}`,
    },
    game: {
      acceptPath: ``,
      deletePath: ``,
      notification: `"${invitation.from}" ${t('gameInv')}`,
    },
  };
  const invitationAcceptMutation = mutationPost(
    invitationProperties[type].acceptPath
  );
  const invitationDeleteMutation = mutationDelete(
    invitationProperties[type].deletePath
  );

  const handleInvitationAccept = () => {
    invitationAcceptMutation.mutate(
      {},
      {
        onSuccess: () => {
          // 사이드바 닫기
          // 채널로 이동
        },
        onError: () => {},
      }
    );
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
