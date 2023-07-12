import { NextApiRequest, NextApiResponse } from 'next';

import { Emoji, Emojis } from 'types/userTypes';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Emojis | Error>) => {
  const { selected } = req.query;
  if (req.method === 'GET') {
    selected
      ? res.status(200).json({ emojis: emojis.slice(0, 4) })
      : res.status(200).json({ emojis: emojis });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const emojis: Emoji[] = [
  {
    id: 1,
    name: '빵긋',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/1.svg',
    status: 'selected',
  },
  {
    id: 2,
    name: '눈물',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/2.svg',
    status: 'selected',
  },
  {
    id: 3,
    name: '화남',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/3.svg',
    status: 'selected',
  },
  {
    id: 4,
    name: '빵긋',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/4.svg',
    status: 'selected',
  },
  {
    id: 5,
    name: '눈물',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/5.svg',
    status: 'achieved',
  },
  {
    id: 6,
    name: '화남',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/6.svg',
    status: 'achieved',
  },
  {
    id: 7,
    name: '빵긋',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/7.svg',
    status: 'achieved',
  },
  {
    id: 8,
    name: '눈물',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/8.svg',
    status: 'achieved',
  },
  {
    id: 9,
    name: '화남',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/9.svg',
    status: 'achieved',
  },
  {
    id: 10,
    name: '빵긋',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/10.svg',
    status: 'achieved',
  },
  {
    id: 11,
    name: '눈물',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/11.svg',
    status: 'achieved',
  },
  {
    id: 12,
    name: '화남',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/12.svg',
    status: 'achieved',
  },
  {
    id: 13,
    name: '화남',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/13.svg',
    status: 'achieved',
  },

  {
    id: 14,
    name: '화남',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/14.svg',
    status: 'achieved',
  },

  {
    id: 15,
    name: '화남',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/15.svg',
    status: 'achieved',
  },

  {
    id: 16,
    name: '화남',
    imgUrl: 'https://drpong.s3.ap-northeast-2.amazonaws.com/emojis/16.svg',
    status: 'achieved',
  },
];
