import useTranslation from 'next-translate/useTranslation';

import { useState } from 'react';

import { UserImages } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/signUp/SignUp.module.scss';

export default function UserImage() {
  const { t } = useTranslation('signUp');
  const { get } = useCustomQuery();
  const [userImages, setUserImages] = useState<UserImages>(defaultUserImages);
  const { isError, isLoading } = get(
    'userImage',
    `users/images`,
    setUserImages
  );

  return (
    <div className={styles.profileImageField}>
      {userImages.images.map(({ id, url }, i) => {
        return (
          <span key={i} className={styles.profileImage}>
            <input type='radio' id={`${id}`} name='userImage' value={id} />
            <label htmlFor={`${id}`}>
              <img src={url} alt='img' />
            </label>
          </span>
        );
      })}
    </div>
  );
}

const defaultUserImages: UserImages = {
  images: [
    {
      id: 0,
      url: '',
    },
  ],
};
