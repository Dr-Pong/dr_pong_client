import { Head, Html, Main, NextScript } from 'next/document';

import React from 'react';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, user-scalable=no'
        ></meta>
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5861134754944224'
          crossOrigin='anonymous'
        ></script>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        ></script>
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <title>Dr. Pong</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
