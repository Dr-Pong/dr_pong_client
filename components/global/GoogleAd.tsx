import React, { useEffect } from 'react';

import styles from 'styles/global/GoogleAd.module.scss';

export default function GoogleAd({
  client = '',
  slot = '',
  format = '',
}: {
  client?: string;
  slot?: string;
  format?: string;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    window.onload = () => {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    };
  }, []);

  if (process.env.NODE_ENV !== 'production')
    return (
      <div
        style={{
          background: '#e9e9e9',
          color: 'black',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '16px',
          margin: '0',
        }}
      >
        광고 표시 영역
      </div>
    );

  return (
    <ins
      className={styles[format]}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
    />
  );
}
