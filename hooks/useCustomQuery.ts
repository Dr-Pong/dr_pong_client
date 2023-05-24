import React from 'react';
import {
  QueryKey,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import instance from 'utils/axios';

export type MutationType = (
  path: string,
  options?: object
) =>
  | UseMutationResult<object, unknown, object, unknown>
  | UseMutationResult<object, unknown, void, unknown>;
const useCustomQuery = () => {
  const queryClient = useQueryClient();
  const getDefaultOptions = {
    retry: 0,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  };
  const get = (
    queryKey: QueryKey,
    path: string,
    setState?: React.Dispatch<React.SetStateAction<any>>,
    options: object = getDefaultOptions
  ) => {
    return useQuery(
      queryKey,
      async () => {
        const { data } = await instance.get(path);
        setState?.(data);
        return data;
      },
      options
    );
  };

  const mutationPatch = (path: string, options: object = {}) => {
    return useMutation(async (body: object): Promise<object> => {
      const { data } = await instance.patch(path, body);
      return data;
    }, options);
  };

  const mutationPost = (path: string, options: object = {}) => {
    return useMutation(async (body: object): Promise<object> => {
      const { data } = await instance.post(path, body);
      return data;
    }, options);
  };

  const mutationDelete = (path: string, options: object = {}) => {
    return useMutation(async (): Promise<object> => {
      const { data } = await instance.delete(path);
      return data;
    }, options);
  };

  return { get, mutationPatch, mutationPost, mutationDelete, queryClient };
};

export default useCustomQuery;
