import { Image } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/signUp/SignUp.module.scss';

export default function UserImage({ selectedId }: { selectedId?: number }) {
  const { get } = useCustomQuery();
  const { data, isError, isLoading } = get('user_image', `users/images`);

  if (isLoading) return null;

  return (
    <div className={styles.profileImageField}>
      {data.images.map(({ id, url }: Image, i: number) => {
        return (
          <span key={i} className={styles.profileImage}>
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
