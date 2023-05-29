import { NextApiRequest, NextApiResponse } from 'next';

import { ChatResponse, RawChat } from 'types/chatTypes';

type Error = {
  message: string;
};
export default (
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse | Error>
) => {
  const { offset, count } = req.query;

  if (req.method === 'GET') {
    const reverse = rawChats.reverse();
    const chats = reverse.slice(
      Number(offset ?? 0),
      Number(offset ?? 0) + Number(count)
    );
    const isLastPage = Number(offset) - Number(count) <= 0;

    res.status(200).json({ chats: chats, isLastPage: isLastPage });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const rawChats: RawChat[] = [
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-01-01 00:00:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:01:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:02:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:03:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:04:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:05:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:01:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:02:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:03:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:04:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-01-02 00:05:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-03 00:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-04 00:00:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-05 00:01:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-05 00:02:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-01-05 00:03:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-05 00:04:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-05 00:05:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 00:07:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 14:07:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 15:00:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 16:00:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 18:00:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 20:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-01-07 21:00:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-11 10:00:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-11 10:00:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-11 12:00:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-15 00:00:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-01-15 00:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-15 00:00:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-15 00:00:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-16 00:00:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-16 00:00:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-16 00:00:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-01-16 00:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-17 00:12:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-18 01:00:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-19 19:00:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-20 00:00:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-21 20:00:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-21 22:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-22 05:00:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-22 07:00:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-22 07:12:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-25 10:00:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-25 20:00:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-26 03:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-26 09:00:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-01 10:00:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-01 20:00:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-11 08:00:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-03-12 00:00:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 11:00:05'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:00:00'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:10:01'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:11:02'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:12:03'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-03-12 12:15:04'),
  },
  {
    message: '언뽈기븐~암어빌른~',
    nickname: 'hakim',
    createdAt: new Date('2020-03-12 12:17:05'),
  },
];
