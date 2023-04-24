import { QueryKey, useMutation, useQuery } from "react-query";

import { UserDetail } from 'types/myPageTypes';

import instance from 'utils/axios';

const useCustomQuery = () => {
  const get = (key: QueryKey, api: string, setter?: (a: any) => void) => {
    const fetch = async (): Promise<any> => {
      const { data } = await instance.get(api);
      setter?.(data);
      return data;
    };
    return useQuery(key, fetch);
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
