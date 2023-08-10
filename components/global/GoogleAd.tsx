import React, { useEffect } from 'react';

export default function GoogleAd({
  className = 'adsbygoogle',
  client = '',
  slot = '',
  format = '',
  responsive = '',
  layoutKey = '',
}: {
  className?: string;
  client?: string;
  slot?: string;
  format?: string;
  responsive?: string;
  layoutKey?: string;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
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
    <div>
      <ins
        className={className}
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'block',
          textAlign: 'center',
          margin: '0',
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-ad-layout-key={layoutKey}
      />
    </div>
  );
}
