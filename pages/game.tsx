import { ReactElement } from 'react';

import Layout from 'components/layouts/Layout';
import LoginFilter from 'components/layouts/LoginFilter';

export default function Game() {
  return <></>;
}

Game.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <Layout>{page}</Layout>
    </LoginFilter>
  );
};
