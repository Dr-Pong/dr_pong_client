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
    let chats;
    const start = rawChats.length + 1 - Number(offset);
    if (!offset) chats = rawChats.slice(0, Number(count));
    else chats = rawChats.slice(start, start + Number(count));
    const isLastPage = Number(offset) - Number(count) <= 0;

    res.status(200).json({ chats: chats, isLastPage: isLastPage });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const rawChats: RawChat[] = [
  {
    id: 1,
    message: '언뽈기븐~암어빌른~1',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:00'),
  },
  {
    id: 2,
    message: '언뽈기븐~암어빌른~2',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:01'),
  },
  {
    id: 3,
    message: '언뽈기븐~암어빌른~3',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:02'),
  },
  {
    id: 4,
    message: '언뽈기븐~암어빌른~4',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:03'),
  },
  {
    id: 5,
    message: '언뽈기븐~암어빌른~5',
    nickname: 'hakim',
    createdAt: new Date('2020-01-01 00:00:04'),
  },
  {
    id: 6,
    message: '언뽈기븐~암어빌른~6',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:00:05'),
  },
  {
    id: 7,
    message: '언뽈기븐~암어빌른~7',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:01:00'),
  },
  {
    id: 8,
    message: '언뽈기븐~암어빌른~8',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:02:01'),
  },
  {
    id: 9,
    message: '언뽈기븐~암어빌른~9',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:03:02'),
  },
  {
    id: 10,
    message: '언뽈기븐~암어빌른~10',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:04:03'),
  },
  {
    id: 11,
    message: '언뽈기븐~암어빌른~11',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-01 00:05:04'),
  },
  {
    id: 12,
    message: '언뽈기븐~암어빌른~12',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:00:05'),
  },
  {
    id: 13,
    message: '언뽈기븐~암어빌른~13',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:01:00'),
  },
  {
    id: 14,
    message: '언뽈기븐~암어빌른~14',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:02:01'),
  },
  {
    id: 15,
    message: '언뽈기븐~암어빌른~15',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:03:02'),
  },
  {
    id: 16,
    message: '언뽈기븐~암어빌른~16',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-02 00:04:03'),
  },
  {
    id: 17,
    message: '언뽈기븐~암어빌른~17',
    nickname: 'hakim',
    createdAt: new Date('2020-01-02 00:05:04'),
  },
  {
    id: 18,
    message: '언뽈기븐~암어빌른~18',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-03 00:00:05'),
  },
  {
    id: 19,
    message: '언뽈기븐~암어빌른~19',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-04 00:00:00'),
  },
  {
    id: 20,
    message: '언뽈기븐~암어빌른~20',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-05 00:01:01'),
  },
  {
    id: 21,
    message: '언뽈기븐~암어빌른~21',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-05 00:02:02'),
  },
  {
    id: 22,
    message: '언뽈기븐~암어빌른~22',
    nickname: 'hakim',
    createdAt: new Date('2020-01-05 00:03:03'),
  },
  {
    id: 23,
    message: '언뽈기븐~암어빌른~23',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-05 00:04:04'),
  },
  {
    id: 24,
    message: '언뽈기븐~암어빌른~24',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-05 00:05:05'),
  },
  {
    id: 25,
    message: '언뽈기븐~암어빌른~25',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 00:07:00'),
  },
  {
    id: 26,
    message: '언뽈기븐~암어빌른~26',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 14:07:01'),
  },
  {
    id: 27,
    message: '언뽈기븐~암어빌른~27',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 15:00:02'),
  },
  {
    id: 28,
    message: '언뽈기븐~암어빌른~28',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 16:00:03'),
  },
  {
    id: 29,
    message: '언뽈기븐~암어빌른~29',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 18:00:04'),
  },
  {
    id: 30,
    message: '언뽈기븐~암어빌른~30',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-07 20:00:05'),
  },
  {
    id: 31,
    message: '언뽈기븐~암어빌른~31',
    nickname: 'hakim',
    createdAt: new Date('2020-01-07 21:00:00'),
  },
  {
    id: 32,
    message: '언뽈기븐~암어빌른~32',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-11 10:00:01'),
  },
  {
    id: 33,
    message: '언뽈기븐~암어빌른~33',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-11 10:00:02'),
  },
  {
    id: 34,
    message: '언뽈기븐~암어빌른~34',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-11 12:00:03'),
  },
  {
    id: 35,
    message: '언뽈기븐~암어빌른~35',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-15 00:00:04'),
  },
  {
    id: 36,
    message: '언뽈기븐~암어빌른~36',
    nickname: 'hakim',
    createdAt: new Date('2020-01-15 00:00:05'),
  },
  {
    id: 37,
    message: '언뽈기븐~암어빌른~37',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-15 00:00:00'),
  },
  {
    id: 38,
    message: '언뽈기븐~암어빌른~38',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-15 00:00:01'),
  },
  {
    id: 39,
    message: '언뽈기븐~암어빌른~39',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-16 00:00:02'),
  },
  {
    id: 40,
    message: '언뽈기븐~암어빌른~40',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-16 00:00:03'),
  },
  {
    id: 41,
    message: '언뽈기븐~암어빌른~41',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-16 00:00:04'),
  },
  {
    id: 42,
    message: '언뽈기븐~암어빌른~42',
    nickname: 'hakim',
    createdAt: new Date('2020-01-16 00:00:05'),
  },
  {
    id: 43,
    message: '언뽈기븐~암어빌른~43',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-17 00:12:00'),
  },
  {
    id: 44,
    message: '언뽈기븐~암어빌른~44',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-18 01:00:01'),
  },
  {
    id: 45,
    message: '언뽈기븐~암어빌른~45',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-19 19:00:02'),
  },
  {
    id: 46,
    message: '언뽈기븐~암어빌른~46',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-20 00:00:03'),
  },
  {
    id: 47,
    message: '언뽈기븐~암어빌른~47',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-21 20:00:04'),
  },
  {
    id: 48,
    message: '언뽈기븐~암어빌른~48',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-21 22:00:05'),
  },
  {
    id: 49,
    message: '언뽈기븐~암어빌른~49',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-22 05:00:00'),
  },
  {
    id: 50,
    message: '언뽈기븐~암어빌른~50',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-22 07:00:01'),
  },
  {
    id: 51,
    message: '언뽈기븐~암어빌른~51',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-22 07:12:02'),
  },
  {
    id: 52,
    message: '언뽈기븐~암어빌른~52',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-25 10:00:03'),
  },
  {
    id: 53,
    message: '언뽈기븐~암어빌른~53',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-25 20:00:04'),
  },
  {
    id: 54,
    message: '언뽈기븐~암어빌른~54',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-26 03:00:05'),
  },
  {
    id: 55,
    message: '언뽈기븐~암어빌른~55',
    nickname: 'hakikim',
    createdAt: new Date('2020-01-26 09:00:00'),
  },
  {
    id: 56,
    message: '언뽈기븐~암어빌른~56',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-01 10:00:01'),
  },
  {
    id: 57,
    message: '언뽈기븐~암어빌른~57',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-01 20:00:02'),
  },
  {
    id: 58,
    message: '언뽈기븐~암어빌른~58',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-11 08:00:03'),
  },
  {
    id: 59,
    message: '언뽈기븐~암어빌른~59',
    nickname: 'hakim',
    createdAt: new Date('2020-03-12 00:00:04'),
  },
  {
    id: 60,
    message: '언뽈기븐~암어빌른~60',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 11:00:05'),
  },
  {
    id: 61,
    message: '언뽈기븐~암어빌른~61',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:00:00'),
  },
  {
    id: 62,
    message: '언뽈기븐~암어빌른~62',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:10:01'),
  },
  {
    id: 63,
    message: '언뽈기븐~암어빌른~63',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:11:02'),
  },
  {
    id: 64,
    message: '언뽈기븐~암어빌른~64',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:12:03'),
  },
  {
    id: 65,
    message: '언뽈기븐~암어빌른~65',
    nickname: 'hakim',
    createdAt: new Date('2020-03-12 12:15:04'),
  },
  {
    id: 66,
    message: '언뽈기븐~암어빌른~66',
    nickname: 'hakim',
    createdAt: new Date('2020-03-12 12:17:05'),
  },
  {
    id: 67,
    message: '언뽈기븐~암어빌른~67',
    nickname: 'hakikim',
    createdAt: new Date('2020-03-12 12:20:00'),
  },
  {
    id: 68,
    message: 'new message',
    nickname: 'hakikim',
    createdAt: new Date(),
  },
].reverse();
