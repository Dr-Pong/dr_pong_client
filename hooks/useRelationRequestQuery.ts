import useCustomQuery from 'hooks/useCustomQuery';

const useRelationRequestQuery = () => {
  const { mutationPost, mutationDelete } = useCustomQuery();

  const friendRequest = (nickname: string) => {
    mutationPost.mutate({ path: `/users/friends/${nickname}`, body: {} });
  };

  const friendDeleteRequest = (nickname: string) => {
    mutationDelete(`/users/friends/${nickname}`).mutate();
  };

  const blockRequest = (nickname: string) => {
    mutationPost.mutate({ path: `/users/blocks/${nickname}`, body: {} });
  };

  const withdrawBlockRequest = (nickname: string) => {
    mutationDelete(`/users/blocks/${nickname}`).mutate();
  };
  return {
    friendRequest,
    friendDeleteRequest,
    blockRequest,
    withdrawBlockRequest,
  };
};

export default useRelationRequestQuery;
