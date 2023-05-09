import useCustomQuery from 'hooks/useCustomQuery';

const useRelationRequestQuery = () => {
  const { mutationPost, mutationDelete } = useCustomQuery();

  const friendRequest = (nickname: string) => {
    mutationPost.mutate({ path: `/users/friends/${nickname}`, body: {} });
  };

  const breakupRequest = (nickname: string) => {
    mutationDelete(`/users/friends/${nickname}`).mutate();
  };

  const blockRequest = (nickname: string) => {
    mutationPost.mutate({ path: `/users/blocks/${nickname}`, body: {} });
  };

  const unblockRequest = (nickname: string) => {
    mutationDelete(`/users/blocks/${nickname}`).mutate();
  };
  return {
    friendRequest,
    breakupRequest,
    blockRequest,
    unblockRequest,
  };
};

export default useRelationRequestQuery;
