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
      nickname: 'hakim1',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim2',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim3',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim4',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim5',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim6',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim7',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim8',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim9',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      nickname: 'hakim0',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
  ],
};
