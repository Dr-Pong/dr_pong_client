import { NextApiRequest, NextApiResponse } from 'next';

import { TopRanker } from 'types/rankTypes';

type Error = {
  message: string;
};

type Rankers = {
  top: TopRanker[];
};

export default (req: NextApiRequest, res: NextApiResponse<Rankers | Error>) => {
  const { count } = req.query;
  const num = typeof count === 'string' ? parseInt(count) : 1;

  if (req.method === 'GET') {
    res.status(200).json({
      top: topRankers.slice(0, num),
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const topRankers = [
  {
    rank: 1,
    nickname: 'jihyukim',
    lp: 5000,
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jihyukim.jpeg?imwidth=100',
  },
  {
    rank: 2,
    nickname: 'hakim',
    lp: 4000,
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
  },
  {
    rank: 3,
    nickname: 'jiyun',
    lp: 3000,
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jiyun.jpeg?imwidth=100',
  },
  {
    rank: 4,
    nickname: 'jiyun',
    lp: 3000,
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jiyun.jpeg?imwidth=100',
  },
];
