import { Achievements, Emojis, Titles } from 'types/myPageTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import { DetailDto } from 'components/myPage/ProfileCard';
import { empty } from 'components/myPage/TitleDropdown';

const useMyPageQuery = (userName: string, type?: string) => {
  const { get, patch } = useCustomQuery();
  const getProfile = (setter: (detailDto: DetailDto) => void) => {
    return get('userDetail', `/users/${userName}/detail`, setter);
  };
  const patchProfile = () => {
    return patch(`/users/${userName}/detail`, 'userDetail');
  };
  const getAll = (setter?: AchievementsSetter | EmojisSetter) => {
    return get([`all${type}`], `/users/${userName}/${type}`, setter);
  };
  const getSelected = (setter?: AchievementsSetter | EmojisSetter) => {
    return get(
      [`selected${type}`],
      `/users/${userName}/${type}?selected=true`,
      setter
    );
  };
  const patchSelectables = () => {
    return patch(`/users/${userName}/${type}`, [
      [`all${type}`],
      [`selected${type}`],
    ]);
  };
  const getStat = () => {
    return get(`userStat`, `/users/${userName}/stat`);
  };
  const getTitles = () => {
    return get(
      `userTitles`,
      `/users/${userName}/titles`,
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
