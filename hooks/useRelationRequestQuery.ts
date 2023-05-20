import useCustomQuery from 'hooks/useCustomQuery';

const useRelationRequestQuery = (nickname: string) => {
  const { mutationPost, mutationDelete } = useCustomQuery();
  const postDefaultOption = {};
  const deleteDefaultOption = {};

  const friendRequest = () => {
    return mutationPost(
      `/users/friends/pendings/${nickname}`,
      postDefaultOption
    );
  };

  const acceptFriendRequest = () => {
    return mutationPost(`/users/friends/${nickname}`, postDefaultOption);
  };

  const rejectFriendRequest = () => {
    return mutationDelete(
      `/users/friends/pendings/${nickname}`,
      deleteDefaultOption
    );
  };

  const breakupRequest = () => {
    return mutationDelete(`/users/friends/${nickname}`, deleteDefaultOption);
  };

  const blockRequest = () => {
    return mutationPost(`/users/blocks/${nickname}`, postDefaultOption);
  };

  const unblockRequest = () => {
    return mutationDelete(`/users/blocks/${nickname}`, deleteDefaultOption);
  };
  return {
    friendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    breakupRequest,
    blockRequest,
    unblockRequest,
  };
};

export default useRelationRequestQuery;
