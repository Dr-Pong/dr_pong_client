import { useRecoilValue } from 'recoil';
import { userState } from 'recoils/user';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/game/Emojis.module.scss';
import { Emoji } from 'types/userTypes';

export default function Emojis() {
  const { nickname } = useRecoilValue(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get('', `/users/${nickname}/emojis?selected=true`);

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorRefresher />

  return (
    <div className={styles.emojisContainer}>
      {data?.emojis.map((emoji: Emoji) => (
        <img
          className={styles.emoji}
          src={emoji.imgUrl}
          onClick={() => { }}
        />
      ))}
    </div>
  );
};
