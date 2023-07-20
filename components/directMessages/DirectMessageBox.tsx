import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { alertState } from 'recoils/alert';
import { sideBarState } from 'recoils/sideBar';

import { DMRoom } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/directMessages/DirectMessages.module.scss';

type DirectMessageBoxProps = {
  dmRoom: DMRoom;
  isEditable: boolean;
};

export default function DirectMessageBox({
  dmRoom,
  isEditable,
}: DirectMessageBoxProps) {
  const setSideBar = useSetRecoilState(sideBarState);
  const setAlert = useSetRecoilState(alertState);
  const { nickname, imgUrl, newChats } = dmRoom;
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { mutationDelete } = useCustomQuery();
  const roomDeleteMutation = mutationDelete(
    `/users/friends/chats/${nickname}`,
    {
      onSuccess: () => {
        setIsDeleted(true);
      },
      onError: () => {
        setAlert({ type: 'failure' });
      },
    }
  );

  const handleRouterToChat = () => {
    if (isEditable) return;
    setSideBar(null);
    router.push(`/chats/dm/${nickname}`);
  };

  const handleRoomDelete = () => {
    roomDeleteMutation.mutate();
  };

  const makeBoxStyle = useMemo<string>(() => {
    let style: string = styles.directMessageBox;
    if (isEditable) style += ` ${styles.noCursor}`;
    if (isDeleted) style += ` ${styles.invisible}`;
    return style;
  }, [isEditable, isDeleted]);

  return (
    <div className={makeBoxStyle} onClick={handleRouterToChat}>
      <img src={imgUrl} className={styles.profileImage} alt='img' />
      <span className={styles.nickname}>{nickname}</span>
      {isEditable ? (
        <span className={styles.deleteButton} onClick={handleRoomDelete}>
          <IoMdClose />
        </span>
      ) : (
        newChats !== 0 && (
          <span className={styles.messageCount}>
            {newChats > 99 ? '99+' : newChats.toString()}
          </span>
        )
      )}
    </div>
  );
}
