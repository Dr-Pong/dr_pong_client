import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React, { useState } from 'react';

import { TbError404, TbFaceIdError, TbFaceId } from 'react-icons/tb';

import styles from 'styles/custom404/Custom404.module.scss';

export default function Custom404() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const handleRouterToHome = () => {
    router.push('/');
  }

  return (
    <div className={styles.custom404Container}>
      <div className={styles.title}>
        <TbError404 className={styles.icon404} />
        <h1>Page Not Found</h1>
      </div>
      <div className={styles.face} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isHovered ? (
          <>
            <span className={styles.tooltip}>{t('Yes')}</span>
            <TbFaceId className={styles.iconFace} onClick={handleRouterToHome} />
          </>
        ) : (
          <>
            <span className={styles.tooltip}>{t('GoToHome?')}</span>
            <TbFaceIdError className={styles.iconFace} onClick={handleRouterToHome} />
          </>
        )}
      </div>
      <p className={styles.message}>{t('404 message')}</p>
    </div>
  );
}
