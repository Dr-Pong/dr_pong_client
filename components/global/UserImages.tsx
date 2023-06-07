import { Image } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

import styles from 'styles/global/UserImages.module.scss';

export default function UserImages({
  selectedId = 1,
}: {
  selectedId?: number;
}) {
  const { get } = useCustomQuery();
  const { data, isError, isLoading } = get('user_image', `users/images`);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div className={styles.userImagesContainer}>
      {data.images.map(({ id, url }: Image, i: number) => {
        return (
          <span key={i} className={styles.userImage}>
            <input
              type='radio'
              id={`${id}`}
              name='userImage'
              value={id}
              defaultChecked={id === selectedId}
            />
            <label htmlFor={`${id}`}>
              <img src={url} alt='img' />
            </label>
          </span>
        );
      })}
    </div>
  );
}
