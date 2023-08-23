import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React from 'react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import { alertState } from 'recoils/alert';
import { sideBarState } from 'recoils/sideBar';

import { Invitation } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import { timeConverter } from 'utils/timezoneResolver';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/notifications/Notifications.module.scss';

type InvitationBoxProps = {
  type: string;
  invitation: Invitation;
  toastId?: string;
};

type InvitationProperty = {
  acceptPath: string;
  deletePath: string;
  notification: string;
};

export default function InvitationBox({
  type,
  invitation,
  toastId,
}: InvitationBoxProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const setSideBar = useSetRecoilState(sideBarState);
  const setAlert = useSetRecoilState(alertState);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { mutationPatch, mutationDelete, queryClient } = useCustomQuery();
  const { id, from, createdAt, channelId, channelName } = invitation;
  const invitationProperties: { [key: string]: InvitationProperty } = {
    channel: {
      acceptPath: `/invitations/channels/${channelId}`,
      deletePath: `/invitations/channels/${channelId}`,
      notification: `"${from}" ${t('channelInv1')} "${channelName}" ${t(
        'channelInv2'
      )}`,
    },
    game: {
      acceptPath: `/invitations/games/${id}`,
      deletePath: `/invitations/games/${id}`,
      notification: `"${from}" ${t('gameInv')}`,
    },
  };

  const invitationAcceptMutation = mutationPatch(
    invitationProperties[type].acceptPath,
    {
      onSuccess: (response: { gameId: string }) => {
        toastId ? toast.remove(toastId) : setSideBar(null);
        queryClient.invalidateQueries([`notifications${toQueryKey(type)}`]);
        queryClient.invalidateQueries(['notificationDot']);
        if (type === 'channel') {
          setModal(false);
          setSideBar(null);
          router.push(`/chats/channel/${channelId}`);
        }
        else if (type === 'game') {
          setModal(false);
          setSideBar(null);
          router.push(`/game/${response.gameId}`);
        }
      },
      onError: () => {
        setAlert({ type: 'failure' });
      },
    }
  );

  const invitationDeleteMutation = mutationDelete(
    invitationProperties[type].deletePath,
    {
      onSuccess: () => {
        toastId ? toast.remove(toastId) : setIsDeleted(true);
        queryClient.invalidateQueries([`notifications${toQueryKey(type)}`]);
        queryClient.invalidateQueries(['notificationDot']);
      },
      onError: () => {
        setAlert({ type: 'failure' });
      },
    }
  );

  const makeBoxStyle = useMemo<string>(() => {
    let style: string = styles.invitationBox;
    if (isDeleted) style += ` ${styles.invisible}`;
    return style;
  }, [isDeleted]);

  const handleInvitationAccept = () => {
    invitationAcceptMutation.mutate({});
  };

  const handleInvitationDelete = () => {
    invitationDeleteMutation.mutate();
  };

  return (
    <div className={makeBoxStyle}>
      <div className={styles.notification}>
        {invitationProperties[type].notification}
      </div>
      <div className={styles.buttonsTimeWrap}>
        <div className={styles.time}>{timeConverter(createdAt)}</div>
        <div className={styles.buttons}>
          <BasicButton
            style='ball'
            color='purple'
            handleButtonClick={handleInvitationAccept}
          >
            <IoMdCheckmark />
          </BasicButton>
          <BasicButton
            style='ball'
            color='purple'
            handleButtonClick={handleInvitationDelete}
          >
            <IoMdClose />
          </BasicButton>
        </div>
      </div>
    </div>
  );
}

const toQueryKey = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1) + 's';
};
