import { Record, Records } from 'types/historyTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import instance from 'utils/axios';

const useRecordsQuery = (userName: string) => {
  const { get } = useCustomQuery();
  const fetchMatchHistory = async (lastGameId: number): Promise<Records> => {
    const count = 10;
    return (
      await instance.get(
        `/users/${userName}/records?lastGameId=${lastGameId}&count=${count}`
      )
    ).data;
  };
  const getMatchDetail = (gameId: number) => {
    return get([`matchDetail`, gameId], `/users/${userName}/records/${gameId}`);
  };
  return { fetchMatchHistory, getMatchDetail };
};
export default useRecordsQuery;
