import useCustomQuery from 'hooks/useCustomQuery';

import { DetailDto } from 'components/myPage/ProfileCard';

const useMyPageQuery = (userName: string) => {
  const { get, patch } = useCustomQuery();
  const getProfile = (setter: (detailDto: DetailDto) => void) => {
    return get(`/users/${userName}/detail`, setter);
  };
  const patchProfile = () => {
    return patch(`/users/${userName}/detail`);
  };

  return { getProfile, patchProfile };
};
export default useMyPageQuery;
