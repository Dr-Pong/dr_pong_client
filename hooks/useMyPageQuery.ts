import { Achievements, Emojis, Titles } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import { DetailDto } from 'components/myPage/profile/ProfileCard';
import { empty } from 'components/myPage/profile/TitleDropdown';

const useMyPageQuery = (nickname: string, type?: string) => {
  const { get, mutationPatch } = useCustomQuery();
  const getProfile = (setter: (detailDto: DetailDto) => void) => {
    return get('userDetail', `/users/${nickname}/detail`, setter);
  };
  const patchProfile = () => {
    return {
      patchImage: mutationPatch(`/users/${nickname}/image`, 'userDetail'),
      patchTitle: mutationPatch(`/users/${nickname}/title`, 'userDetail'),
      patchMessage: mutationPatch(`/users/${nickname}/message`, 'userDetail'),
    };
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
    return mutationPatch(`/users/${nickname}/${type}`, [
      [`all${type}`],
      [`selected${type}`],
    ]);
  };
  const getStat = () => {
    const {
      data: totalStat,
      isLoading: tsLoading,
      isError: tsError,
    } = get(`userTotalStat`, `/users/${nickname}/stats/total`);
    const {
      data: seasonStat,
      isLoading: ssLoading,
      isError: ssError,
    } = get(`userSeasonStat`, `/users/${nickname}/stats/season`);
    const {
      data: totalRank,
      isLoading: trLoading,
      isError: trError,
    } = get(`userTotalRank`, `/users/${nickname}/ranks/total`);
    const {
      data: seasonRank,
      isLoading: srLoading,
      isError: srError,
    } = get(`userSeasonRank`, `/users/${nickname}/ranks/season`);
    return {
      data: {
        totalStat,
        seasonStat,
        totalRank,
        seasonRank,
      },
      isLoading: tsLoading || ssLoading || trLoading || srLoading,
      isError: tsError || ssError || trError || srError,
    };
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
