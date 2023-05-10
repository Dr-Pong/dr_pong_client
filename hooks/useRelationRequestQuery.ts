import useCustomQuery from 'hooks/useCustomQuery';

const useRelationRequestQuery = () => {
  const { mutationPost, mutationDelete } = useCustomQuery();
  const postDefaultOption = {};
  const deleteDefaultOption = {};

  const friendRequest = (nickname: string) => {
    return mutationPost(`/users/friends/${nickname}`, postDefaultOption);
  };

  const breakupRequest = (nickname: string) => {
    return mutationDelete(`/users/friends/${nickname}`, deleteDefaultOption);
  };

  const blockRequest = (nickname: string) => {
    return mutationPost(`/users/blocks/${nickname}`, postDefaultOption);
  };

  const unblockRequest = (nickname: string) => {
    return mutationDelete(`/users/blocks/${nickname}`, deleteDefaultOption);
  };
  return {
    friendRequest,
    breakupRequest,
    blockRequest,
    unblockRequest,
  };
};

export default useRelationRequestQuery;
