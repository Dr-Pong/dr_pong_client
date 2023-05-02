import { NextApiRequest, NextApiResponse } from 'next';

import { randomInt } from 'next/dist/shared/lib/bloom-filter/utils';

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
    switch (lastGameId) {
      case undefined:
        res.status(400).json({ message: 'Bad Request' });
        return;
      case '0':
        res.status(200).json({
          records: records.slice(0, Number(lastGameId)),
          isLastPage: false,
        });
        return;
      case '1':
        res.status(200).json({
          records: records.slice(Number(lastGameId), Number(lastGameId) + 1),
          isLastPage: false,
        });
        return;
      case '2':
        res.status(200).json({
          records: records.slice(Number(lastGameId), Number(lastGameId) + 1),
          isLastPage: false,
        });
        return;
      case '3':
        res.status(200).json({
          records: records.slice(Number(lastGameId), Number(lastGameId) + 1),
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
    playedAt: '2020-08-01T00:00:00.000Z',
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
    playedAt: '2020-08-02T00:00:00.000Z',
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
    playedAt: '2020-08-03T00:00:00.000Z',
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
    playedAt: '2020-08-04T00:00:00.000Z',
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
];
