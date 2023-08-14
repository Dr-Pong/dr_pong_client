import { NextApiRequest, NextApiResponse } from 'next';

import { Friend } from 'types/friendTypes';

type Error = {
  message: string;
};

type FriendsResponse = {
  users: Friend[];
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<FriendsResponse | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json(friendsResponse);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const friendsResponse: FriendsResponse = {
  users: [
    {
      nickname: 'naeImDa',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'junyopar',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'keokim',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'nheo',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
  ],
};
