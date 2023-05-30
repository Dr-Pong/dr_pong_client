import { useSetRecoilState } from 'recoil';

import { sideBarState } from 'recoils/sideBar';

import { Friend } from 'types/notificationTypes';

import styles from 'styles/directMessages/DirectMessages.module.scss';

type DirectMessageBoxProps = {
  friend: Friend;
};

export default function DirectMessageBox({ friend }: DirectMessageBoxProps) {
  const setSideBar = useSetRecoilState(sideBarState);
  const { nickname, imgUrl, newChats } = friend;

  const handleRouterToChat = () => {
    setSideBar(null);
    // chat 페이지로 이동
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
