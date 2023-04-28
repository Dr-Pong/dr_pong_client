import { useSetRecoilState } from 'recoil';

import React from 'react';
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';

import instance from 'utils/axios';

const useCustomQuery = () => {
  const queryClient = useQueryClient();

  const get = (key: QueryKey, api: string, setter?: (a: any) => void) => {
    const fetch = async (): Promise<any> => {
      const { data } = await instance.get(api);
      setter?.(data);
      return data;
    };
    return useQuery(key, fetch);
  };

  const patch = (api: string, invalidateQueryKey?: QueryKey) => {
    const patchDetail = async (toPatch: any): Promise<any> => {
      const { data } = await instance.patch<any>(api, toPatch);
      return data;
    };
    return useMutation(patchDetail, {
      onSuccess: () => {
        if (invalidateQueryKey)
          queryClient.invalidateQueries(invalidateQueryKey);
      },
    });
  };

  const mutationGet = (
    queryKey: QueryKey,
    path: string,
    setState?: React.Dispatch<React.SetStateAction<any>>
  ) => {
    return useQuery(
      [queryKey],
      async () => {
        const { data } = await instance.get(path);
        setState?.(data);
      },
      {
        retry: 0,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      }
    );
  };

  const mutationPost = useMutation(
    ({ path, data }: { path: string; data?: object }) =>
      instance.post(path, data)
  );

  return { get, patch, mutationGet, mutationPost };
};

export default useCustomQuery;
