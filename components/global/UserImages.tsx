import React from 'react';

import { Image } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';

import styles from 'styles/global/UserImages.module.scss';

export default function UserImages({
  selectedId = 1,
}: {
  selectedId?: number;
}) {
  const { get } = useCustomQuery();
  const { data, isError, isLoading } = get('userImages', `users/images`);

  if (isError) return <ErrorRefresher />;

  return (
    <div className={styles.userImagesContainer}>
      {isLoading
        ? Array(8)
            .fill(null)
            .map((el, i) => <div key={i} className={styles.emptyImage}></div>)
        : data.images.map(({ id, url }: Image, i: number) => {
            return (
              <label key={i} className={styles.userImage} htmlFor={`${id}`}>
                <input
                  type='radio'
                  id={`${id}`}
                  name='userImage'
                  value={id}
                  defaultChecked={id === selectedId}
                />
                <img src={url} alt='img' />
              </label>
            );
          })}
    </div>
  );
}
