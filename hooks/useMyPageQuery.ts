import { QueryKey } from 'react-query';

import { Achievements, Emojis, Titles } from 'types/userTypes';
import { DetailDto } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';

const useMyPageQuery = (nickname: string, type?: string) => {
  const { get, mutationPatch, queryClient } = useCustomQuery();

  const profileGet = (setter: (detailDto: DetailDto) => void) => {
    return get('userDetail', `/users/${nickname}/detail`, setter);
  };

  const profileMutationPatch = () => {
    const options = (queryKey: QueryKey) => {
      return {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKey);
        },
      };
    };
    return {
      patchImage: mutationPatch(
        `/users/${nickname}/image`,
        options('userDetail')
      ),
      patchTitle: mutationPatch(
        `/users/${nickname}/title`,
        options('userDetail')
      ),
      patchMessage: mutationPatch(
        `/users/${nickname}/message`,
        options('userDetail')
      ),
    };
  };

  const allItemsGet = (setter?: AchievementsSetter | EmojisSetter) => {
    return get([`all${type}`], `/users/${nickname}/${type}`, setter);
  };

  const selectedGet = (setter?: AchievementsSetter | EmojisSetter) => {
    return get(
      [`selected${type}`],
      `/users/${nickname}/${type}?selected=true`,
      setter
    );
  };

  const selectablesMutationPatch = () => {
    const options = (queryKey: QueryKey) => {
      return {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKey);
        },
      };
    };
    return mutationPatch(
      `/users/${nickname}/${type}`,
      options([[`all${type}`], [`selected${type}`]])
    );
  };

  const statGet = () => {
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

  const titlesGet = () => {
    return get(
      `userTitles`,
      `/users/${nickname}/titles`,
      (titles: Titles): void => {
        titles.titles.unshift({
          id: null,
          title: '-----',
        });
      }
    );
  };

  return {
    profileGet,
    profileMutationPatch,
    allItemsGet,
    selectedGet,
    selectablesMutationPatch,
    statGet,
    titlesGet,
  };
};
export default useMyPageQuery;

type AchievementsSetter = (selectable: Achievements) => void;
type EmojisSetter = (selectable: Emojis) => void;
