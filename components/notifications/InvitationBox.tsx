import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import { sideBarState } from 'recoils/sideBar';

import { Invitation } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/notifications/Notifications.module.scss';

import { alertTypeState, openAlertState } from '../../recoils/alert';

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
  const router = useRouter();
  const setSideBar = useSetRecoilState(sideBarState);
  const setOpenAlert = useSetRecoilState(openAlertState);
  const setAlertType = useSetRecoilState(alertTypeState);
  const { mutationPost, mutationDelete, queryClient } = useCustomQuery();
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
        if (type === 'channel') router.push(`/chats/channel/${channelId}`);
        //TODO: if (type === 'game')
      },
      onError: () => {
        setAlertType('fail');
        setOpenAlert(true);
      },
    }
  );

  const invitationDeleteMutation = mutationDelete(
    invitationProperties[type].deletePath,
    {
      onSuccess: () => {
        deleteInvitation(id);
        queryClient.invalidateQueries([`notifications${toQueryKey(type)}`]);
      },
      onError: () => {
        setAlertType('fail');
        setOpenAlert(true);
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
          color='purple'
          handleButtonClick={handleInvitationAccept}
        >
          <IoMdCheckmark />
        </BasicButton>
        <BasicButton
          style='round'
          color='purple'
          handleButtonClick={handleInvitationDelete}
        >
          <IoMdClose />
        </BasicButton>
      </div>
    </div>
  );
}

const toQueryKey = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1) + 's';
};
