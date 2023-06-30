import type { NextPage } from 'next';
import { RecoilRoot } from 'recoil';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import React, { ReactElement, ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import SocketManager from 'components/global/SocketManager';

import 'styles/globals.css';

const LoginFilter = dynamic(() => import('components/layouts/LoginFilter'), {
  ssr: false,
});

const queryClient = new QueryClient();

export type LayoutProps = {
  children: ReactNode;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <LoginFilter>
            <SocketManager namespace={'global'} />
            {getLayout(<Component {...pageProps} />)}
          </LoginFilter>
          <div id='sideBarRoot'></div>
          <div id='modalRoot'></div>
          <div id='upperModalRoot'></div>
          <div id='alertRoot'></div>
          <Toaster />
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </CookiesProvider>
  );
}
