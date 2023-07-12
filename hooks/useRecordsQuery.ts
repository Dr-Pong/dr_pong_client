import { Records } from 'types/historyTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import instance from 'utils/axios';

const useRecordsQuery = (nickname: string) => {
  const { get } = useCustomQuery();

  const matchHistoryFetch = async (lastGameId: number): Promise<Records> => {
    const count = 10;
    return (
      await instance.get(
        `/users/${nickname}/records?lastGameId=${lastGameId}&count=${count}`
      )
    ).data;
  };

  const gameResultGet = () => {
    return get(
      [`gameResult`],
      `/users/${nickname}/records?lastGameId=0&count=1`
    );
  };

  const expResultGet = (gameId: number) => {
    return get(
      [`expResult`, gameId],
      `/users/${nickname}/records/${gameId}/exp`
    );
  };

  const matchDetailGet = (gameId: number) => {
    return get([`matchDetail`, gameId], `/users/${nickname}/records/${gameId}`);
  };

  return { matchHistoryFetch, gameResultGet, expResultGet, matchDetailGet };
};

export default useRecordsQuery;
