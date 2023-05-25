import { useSetRecoilState } from 'recoil';

import { sideBarState } from 'recoils/sideBar';

import { Chat } from 'types/friendTypes';

import styles from 'styles/messages/Messages.module.scss';

export default function MessageBox({ chat }: { chat: Chat }) {
  const setSideBar = useSetRecoilState(sideBarState);
  const { nickname, imgUrl, newChats } = chat;

  const handleRouterToChat = () => {
    setSideBar(null);
    // chat 페이지로 이동
  };

  return (
    <div className={styles.messageBox} onClick={handleRouterToChat}>
      <img src={imgUrl} className={styles.profileImage} alt='img' />
      <span className={styles.nickname}>{nickname}</span>
      {newChats !== 0 && (
        <span className={styles.chatCount}>
          {newChats.toString() + (newChats > 99 ? '+' : '')}
        </span>
      )}
    </div>
  );
}
