import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { sideBarState } from 'recoils/sideBar';

import { DMRoom } from 'types/notificationTypes';

import styles from 'styles/directMessages/DirectMessages.module.scss';

type DirectMessageBoxProps = {
  dmRoom: DMRoom;
};

export default function DirectMessageBox({ dmRoom }: DirectMessageBoxProps) {
  const setSideBar = useSetRecoilState(sideBarState);
  const { nickname, imgUrl, newChats } = dmRoom;
  const router = useRouter();

  const handleRouterToChat = () => {
    setSideBar(null);
    router.push(`/chats/dm/${nickname}`);
  };

  return (
    <div className={styles.directMessageBox} onClick={handleRouterToChat}>
      <img src={imgUrl} className={styles.profileImage} alt='img' />
      <span className={styles.nickname}>{nickname}</span>
      {newChats !== 0 && (
        <span className={styles.messageCount}>
          {newChats > 99 ? '99+' : newChats.toString()}
        </span>
      )}
    </div>
  );
}
