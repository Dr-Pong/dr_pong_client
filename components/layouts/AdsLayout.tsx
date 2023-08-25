import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

import { LayoutProps } from 'pages/_app';

import GoogleAd from 'components/global/GoogleAd';

import styles from 'styles/layouts/AdsLayout.module.scss';

const isTouchScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

export default function AdsLayout({ children }: LayoutProps) {
  const [direction, setDirection] = useState<'row' | 'column'>(
    window.innerHeight / window.innerWidth < 1.3 ? 'row' : 'column'
  );
  const router = useRouter();
  const handleResize = () => {
    if (router.asPath.startsWith('/game') && router.query.roomId) return;
    setDirection(
      window.innerHeight / window.innerWidth < 1.3 ? 'row' : 'column'
    );
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isTouchScreen && (router.asPath === '/' || router.query.roomId))
    return <>{children}</>;
  if (
    direction === 'column' &&
    router.asPath.startsWith('/game') &&
    router.query.roomId
  )
    return <>{children}</>;
  return (
    <div
      className={
        direction === 'row' ? styles.adsLayoutRow : styles.adsLayoutColumn
      }
    >
      {direction === 'row' && (
        <GoogleAd
          client='ca-pub-5861134754944224'
          slot='4781852804'
          format='vertical'
        />
      )}
      {children}
      {direction === 'row' ? (
        <GoogleAd
          client='ca-pub-5861134754944224'
          slot='4781852804'
          format='vertical'
        />
      ) : (
        <GoogleAd
          client='ca-pub-5861134754944224'
          slot='9772393400'
          format='horizontal'
        />
      )}
    </div>
  );
}
