import { UseQueryResult, useMutation, useQuery } from 'react-query';

import { PatchDetail, UserDetail } from 'types/myPageTypes';

import { DetailDto } from '../components/myPage/ProfileCard';
import instance from '../utils/axios';

const useCustomQuery = () => {
  const get = (api: string, setter?: (a: any) => void) => {
    const fetch = async (): Promise<UserDetail> => {
      const { data } = await instance.get(api);
      setter?.(data);
      return data;
    };
    return useQuery(api, fetch);
  };

  const patch = (api: string) => {
    const patchDetail = async (toPatch: any): Promise<any> => {
      const { data } = await instance.patch<any>(api, toPatch);
      return data;
    };
    return useMutation(patchDetail);
  };
  return { get, patch };
};

export default useCustomQuery;
