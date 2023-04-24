import { UseQueryResult, useMutation, useQuery } from 'react-query';

import { PatchDetail, UserDetail } from 'types/myPageTypes';

import { DetailDto } from '../components/myPage/ProfileCard';
import instance from '../utils/axios';

const useMyPageQuery = (userName: string) => {
  const getProfile = (
    setDetailDto: (detailDto: DetailDto) => void
  ): UseQueryResult<UserDetail, Error> => {
    const fetchProfile = async (): Promise<UserDetail> => {
      const res = await instance.get(`/users/${userName}/detail`);
      setDetailDto({
        imgUrl: res.data.imgUrl,
        title: { id: 0, title: res.data.title },
        statusMessage: res.data.statusMessage,
      });
      return res.data;
    };
    return useQuery('userDetail', fetchProfile);
  };

  const patchProfile = () => {
    const patchDetail = async (detail: PatchDetail): Promise<PatchDetail> => {
      const { data } = await instance.patch<PatchDetail>(
        `/users/${userName}/detail`,
        detail
      );
      console.log(detail);
      return data;
    };
    return useMutation(patchDetail);
  };
  return { getProfile, patchProfile };
};

export default useMyPageQuery;
