import { NextApiRequest, NextApiResponse } from 'next';

import { Ranker } from 'types/rankTypes';

type Error = {
  message: string;
};

type Rankers = {
  bottom: Ranker[];
};

export default (req: NextApiRequest, res: NextApiResponse<Rankers | Error>) => {
  const { count, offset } = req.query;
  const num = typeof offset === 'string' ? parseInt(offset) - 1 : 1;

  if (req.method === 'GET') {
    res.status(200).json({
      bottom: bottomRankers.slice(num),
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const bottomRankers = [
  {
    rank: 4,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 5,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 6,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 7,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 8,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 9,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 10,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 11,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 12,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 13,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 14,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 15,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 16,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 17,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 18,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 19,
    nickname: 'jihyukim',
    lp: 3000,
  },
  {
    rank: 20,
    nickname: 'jihyukim',
    lp: 3000,
  },
];
