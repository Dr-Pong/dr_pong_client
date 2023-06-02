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
  const matchDetailGet = (gameId: number) => {
    return get([`matchDetail`, gameId], `/users/${nickname}/records/${gameId}`);
  };
  return { matchHistoryFetch, matchDetailGet };
};
export default useRecordsQuery;
