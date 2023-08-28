import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { TbError404, TbFaceId, TbFaceIdError } from 'react-icons/tb';

import styles from 'styles/custom404/Custom404.module.scss';

export default function Custom404() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [hoverStatus, setHoverStatus] = useState<'hovered' | 'unhovered'>(
    'unhovered'
  );

  const handleMouseEnter = () => {
    setHoverStatus('hovered');
  };

  const handleMouseLeave = () => {
    setHoverStatus('unhovered');
  };

  const handleRouterToHome = () => {
    router.push('/');
  };

  const content = {
    hovered: {
      tooltip: 'Yes',
      icon: (
        <TbFaceId className={styles.iconFace} onClick={handleRouterToHome} />
      ),
    },
    unhovered: {
      tooltip: 'GoToHome?',
      icon: (
        <TbFaceIdError
          className={styles.iconFace}
          onClick={handleRouterToHome}
        />
      ),
    },
  };

  return (
    <div className={styles.custom404Container}>
      <h1 className={styles.title}>
        <TbError404 className={styles.icon404} />
        <div>Page Not Found</div>
      </h1>
      <div
        className={styles.face}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles.tooltip}>
          {t(content[hoverStatus].tooltip)}
        </span>
        {content[hoverStatus].icon}
      </div>
      <p className={styles.message}>{t('404 message')}</p>
    </div>
  );
}
