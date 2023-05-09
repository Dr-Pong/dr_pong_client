import React from 'react';
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';

import instance from 'utils/axios';

const useCustomQuery = () => {
  const queryClient = useQueryClient();

  const get = (
    queryKey: QueryKey,
    path: string,
    setState?: React.Dispatch<React.SetStateAction<any>>
  ) => {
    return useQuery(
      queryKey,
      async () => {
        const { data } = await instance.get(path);
        setState?.(data);
        return data;
      },
      {
        retry: 0,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      }
    );
  };

  const mutationPatch = (path: string, invalidateQueryKey?: QueryKey) => {
    return useMutation(
      async (body: object): Promise<object> => {
        const { data } = await instance.patch(path, body);
        return data;
      },
      {
        onSuccess: () => {
          if (invalidateQueryKey)
            queryClient.invalidateQueries(invalidateQueryKey);
        },
      }
    );
  };

  const mutationPost = useMutation(
    ({ path, body }: { path: string; body?: object }) =>
      instance.post(path, body)
  );

  const mutationDelete = (path: string, invalidateQueryKey?: QueryKey) => {
    return useMutation(
      async (): Promise<object> => {
        const { data } = await instance.delete(path);
        return data;
      },
      {
        onSuccess: () => {
          if (invalidateQueryKey)
            queryClient.invalidateQueries(invalidateQueryKey);
        },
      }
    );
  };

  return { get, mutationPatch, mutationPost, mutationDelete };
};

export default useCustomQuery;
