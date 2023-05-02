import { NextApiRequest, NextApiResponse } from 'next';

import { randomInt } from 'next/dist/shared/lib/bloom-filter/utils';

import { RecordDetail, Records } from 'types/historyTypes';

type Error = {
  message: string;
};
export default (
  req: NextApiRequest,
  res: NextApiResponse<Records | RecordDetail | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json({
      records: [
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
      ],
      isLastPage: true,
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
