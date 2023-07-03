import { NextApiRequest, NextApiResponse } from 'next';

import { Record, RecordDetail, Records } from 'types/historyTypes';

type Error = {
  message: string;
};
export default (
  req: NextApiRequest,
  res: NextApiResponse<Records | RecordDetail | Error>
) => {
  const { count, lastGameId } = req.query;
  if (req.method === 'GET') {
    if (req.query.nickname !== 'hakim') {
      res.status(200).json({
        records: [],
        isLastPage: true,
      });
    }
    switch (lastGameId) {
      case undefined:
        res.status(400).json({ message: 'Bad Request' });
        return;
      case '0':
        res.status(200).json({
          records: [records[5], records[4]],
          isLastPage: false,
        });
        return;
      case '5':
        res.status(200).json({
          records: [records[3], records[2]],
          isLastPage: false,
        });
        return;
      case '3':
        res.status(200).json({
          records: [records[1], records[0]],
          isLastPage: true,
        });
        return;
      default:
        res.status(400).json({ message: 'Bad Request' });
        return;
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const records: Record[] = [
  {
    gameId: 1,
    gameType: 'rank',
    playedAt: '2023-04-25T00:00:00Z',
    me: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakim',
      score: 12,
    },
    you: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/nheo.jpeg?imwidth=100',
      nickname: 'nheo',
      score: 7,
    },
    result: 'win',
  },
  {
    gameId: 2,
    gameType: 'normal',
    playedAt: '2023-05-02T00:00:00Z',
    me: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakim',
      score: 9,
    },
    you: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jaehwkim.jpeg?imwidth=100',
      nickname: 'jaehwkim',
      score: 11,
    },
    result: 'lose',
  },
  {
    gameId: 3,
    gameType: 'rank',
    playedAt: '2023-05-02T17:00:00Z',
    me: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakim',
      score: 1,
    },
    you: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jiyun.jpeg?imwidth=100',
      nickname: 'jiyun',
      score: 15,
    },
    result: 'lose',
  },
  {
    gameId: 4,
    gameType: 'normal',
    playedAt: '2023-05-02T20:00:00Z',
    me: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakim',
      score: 9,
    },
    you: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jihyukim.jpeg?imwidth=100',
      nickname: 'jihyukim',
      score: 5,
    },
    result: 'win',
  },
  {
    gameId: 5,
    gameType: 'normal',
    playedAt: '2023-05-03T09:00:00Z',
    me: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakim',
      score: 3,
    },
    you: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/him.jpeg?imwidth=100',
      nickname: 'him',
      score: 3,
    },
    result: 'tie',
  },
  {
    gameId: 6,
    gameType: 'rank',
    playedAt: '2023-05-03T10:00:00Z',
    me: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakim',
      score: 3,
    },
    you: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/donghyuk.jpeg?imwidth=100',
      nickname: 'hakim2',
      score: 3,
    },
    result: 'tie',
  },
];
