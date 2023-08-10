import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

import { LayoutProps } from 'pages/_app';

import GoogleAd from 'components/global/GoogleAd';

import styles from 'styles/layouts/AdsLayout.module.scss';

export default function AdsLayout({ children }: LayoutProps) {
  const [direction, setDirection] = useState<'row' | 'column' | null>(null);
  const router = useRouter();
  const handleResize = () => {
    setDirection(
      window.innerHeight / window.innerWidth < 1.3 ? 'row' : 'column'
    );
  };

  useEffect(() => {
    setDirection(
      window.innerHeight / window.innerWidth < 1.3 ? 'row' : 'column'
    );
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!direction || router.query.roomId) return <>{children}</>;
  if (direction === 'row') {
    return (
      <div className={styles.adsLayoutRow}>
        <GoogleAd
          client='ca-pub-5861134754944224'
          slot='4781852804'
          format='vertical'
          responsive='true'
        />
        {children}
        <GoogleAd
          client='ca-pub-5861134754944224'
          slot='4781852804'
          format='vertical'
          responsive='true'
        />
      </div>
    );
  }
  return (
    <div className={styles.adsLayoutColumn}>
      {children}
      <GoogleAd
        client='ca-pub-5861134754944224'
        slot='9772393400'
        format='horizontal'
        responsive='true'
      />
    </div>
  );
}
