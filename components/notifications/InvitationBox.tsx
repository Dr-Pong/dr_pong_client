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

export default function InvitationBox({
  type,
  invitation,
}: InvitationBoxProps) {
  const { t } = useTranslation('common');
  const { mutationPost, mutationDelete } = useCustomQuery();
  const acceptPath: { [key: string]: string } = {
    channel: `/channels/${invitation.channelId}/magicpass`,
    game: ``,
  };
  const deletePath: { [key: string]: string } = {
    channel: ``,
    game: ``,
  };
  const invitationAcceptMutation = mutationPost(acceptPath[type]);
  const invitationDeleteMutation = mutationDelete(deletePath[type]);
  const notification = (): string => {
    if (type === 'game') return `"${invitation.from}" ${t('gameInv')}`;
    if (type === 'channel')
      return `"${invitation.from}" ${t('channelInv1')} "${
        invitation.channelName
      }" ${t('channelInv2')}`;
    return '';
  };

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
      <div className={styles.notification}>{notification()}</div>
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
