import { Achievements, Emojis, Titles } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import { DetailDto } from 'components/myPage/ProfileCard';
import { empty } from 'components/myPage/TitleDropdown';

const useMyPageQuery = (nickname: string, type?: string) => {
  const { get, patch } = useCustomQuery();
  const getProfile = (setter: (detailDto: DetailDto) => void) => {
    return get('userDetail', `/users/${nickname}/detail`, setter);
  };
  const patchProfile = () => {
    return patch(`/users/${nickname}/detail`, 'userDetail');
  };
  const getAll = (setter?: AchievementsSetter | EmojisSetter) => {
    return get([`all${type}`], `/users/${nickname}/${type}`, setter);
  };
  const getSelected = (setter?: AchievementsSetter | EmojisSetter) => {
    return get(
      [`selected${type}`],
      `/users/${nickname}/${type}?selected=true`,
      setter
    );
  };
  const patchSelectables = () => {
    return patch(`/users/${nickname}/${type}`, [
      [`all${type}`],
      [`selected${type}`],
    ]);
  };
  const getStat = () => {
    return get(`userStat`, `/users/${nickname}/stat`);
  };
  const getTitles = () => {
    return get(
      `userTitles`,
      `/users/${nickname}/titles`,
      (titles: Titles): void => {
        titles.titles.unshift(empty);
      }
    );
  };
  return {
    getProfile,
    patchProfile,
    getAll,
    getSelected,
    patchSelectables,
    getStat,
    getTitles,
  };
};
export default useMyPageQuery;

type AchievementsSetter = (selectable: Achievements) => void;
type EmojisSetter = (selectable: Emojis) => void;
