import { RecoilRoot } from 'recoil';

import type { AppProps } from 'next/app';

import Layout from 'components/layouts/Layout';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id='modalRoot'></div>
    </RecoilRoot>
  );
}
