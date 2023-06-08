import { NextApiRequest, NextApiResponse } from 'next';

import { Chat, ChatResponse, ChatType } from 'types/chatTypes';

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
  } else if (req.method === 'POST') {
    const rand = Math.floor(Math.random() * 10);
    if (rand % 2 === 0) {
      res.status(400).json({ message: 'Bad Request' });
    } else {
      const { message } = req.body;
      const newChat: Chat = {
        id: rawChats.length + 1,
        message,
        nickname: 'hakim',
        time: new Date(),
        type: 'me',
      };
      rawChats.unshift(newChat);
      res.status(200).json({ message: 'ok' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const rawChats: Chat[] = [
  {
    id: 1,
    message: '언뽈기븐~암어빌른~1',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:00:00'),
    type: 'others' as ChatType,
  },
  {
    id: 2,
    message: '언뽈기븐~암어빌른~2',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:00:01'),
    type: 'others' as ChatType,
  },
  {
    id: 3,
    message: '언뽈기븐~암어빌른~3',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:00:02'),
    type: 'others' as ChatType,
  },
  {
    id: 4,
    message: '언뽈기븐~암어빌른~4',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:00:03'),
    type: 'others' as ChatType,
  },
  {
    id: 5,
    message: '언뽈기븐~암어빌른~5',
    nickname: 'hakim',
    time: new Date('2020-01-01 00:00:04'),
    type: 'others' as ChatType,
  },
  {
    id: 6,
    message: '언뽈기븐~암어빌른~6',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 7,
    message: '언뽈기븐~암어빌른~7',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:01:00'),
    type: 'others' as ChatType,
  },
  {
    id: 8,
    message: '언뽈기븐~암어빌른~8',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:02:01'),
    type: 'others' as ChatType,
  },
  {
    id: 9,
    message: '언뽈기븐~암어빌른~9',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:03:02'),
    type: 'others' as ChatType,
  },
  {
    id: 10,
    message: '언뽈기븐~암어빌른~10',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:04:03'),
    type: 'others' as ChatType,
  },
  {
    id: 11,
    message: '언뽈기븐~암어빌른~11',
    nickname: 'hakikim',
    time: new Date('2020-01-01 00:05:04'),
    type: 'others' as ChatType,
  },
  {
    id: 12,
    message: '언뽈기븐~암어빌른~12',
    nickname: 'hakikim',
    time: new Date('2020-01-02 00:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 13,
    message: '언뽈기븐~암어빌른~13',
    nickname: 'hakikim',
    time: new Date('2020-01-02 00:01:00'),
    type: 'others' as ChatType,
  },
  {
    id: 14,
    message: '언뽈기븐~암어빌른~14',
    nickname: 'hakikim',
    time: new Date('2020-01-02 00:02:01'),
    type: 'others' as ChatType,
  },
  {
    id: 15,
    message: '언뽈기븐~암어빌른~15',
    nickname: 'hakikim',
    time: new Date('2020-01-02 00:03:02'),
    type: 'others' as ChatType,
  },
  {
    id: 16,
    message: '언뽈기븐~암어빌른~16',
    nickname: 'hakikim',
    time: new Date('2020-01-02 00:04:03'),
    type: 'others' as ChatType,
  },
  {
    id: 17,
    message: '언뽈기븐~암어빌른~17',
    nickname: 'hakim',
    time: new Date('2020-01-02 00:05:04'),
    type: 'others' as ChatType,
  },
  {
    id: 18,
    message: '언뽈기븐~암어빌른~18',
    nickname: 'hakikim',
    time: new Date('2020-01-03 00:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 19,
    message: '언뽈기븐~암어빌른~19',
    nickname: 'hakikim',
    time: new Date('2020-01-04 00:00:00'),
    type: 'others' as ChatType,
  },
  {
    id: 20,
    message: '언뽈기븐~암어빌른~20',
    nickname: 'hakikim',
    time: new Date('2020-01-05 00:01:01'),
    type: 'others' as ChatType,
  },
  {
    id: 21,
    message: '언뽈기븐~암어빌른~21',
    nickname: 'hakikim',
    time: new Date('2020-01-05 00:02:02'),
    type: 'others' as ChatType,
  },
  {
    id: 22,
    message: '언뽈기븐~암어빌른~22',
    nickname: 'hakim',
    time: new Date('2020-01-05 00:03:03'),
    type: 'others' as ChatType,
  },
  {
    id: 23,
    message: '언뽈기븐~암어빌른~23',
    nickname: 'hakikim',
    time: new Date('2020-01-05 00:04:04'),
    type: 'others' as ChatType,
  },
  {
    id: 24,
    message: '언뽈기븐~암어빌른~24',
    nickname: 'hakikim',
    time: new Date('2020-01-05 00:05:05'),
    type: 'others' as ChatType,
  },
  {
    id: 25,
    message: '언뽈기븐~암어빌른~25',
    nickname: 'hakikim',
    time: new Date('2020-01-07 00:07:00'),
    type: 'others' as ChatType,
  },
  {
    id: 26,
    message: '언뽈기븐~암어빌른~26',
    nickname: 'hakikim',
    time: new Date('2020-01-07 14:07:01'),
    type: 'others' as ChatType,
  },
  {
    id: 27,
    message: '언뽈기븐~암어빌른~27',
    nickname: 'hakikim',
    time: new Date('2020-01-07 15:00:02'),
    type: 'others' as ChatType,
  },
  {
    id: 28,
    message: '언뽈기븐~암어빌른~28',
    nickname: 'hakikim',
    time: new Date('2020-01-07 16:00:03'),
    type: 'others' as ChatType,
  },
  {
    id: 29,
    message: '언뽈기븐~암어빌른~29',
    nickname: 'hakikim',
    time: new Date('2020-01-07 18:00:04'),
    type: 'others' as ChatType,
  },
  {
    id: 30,
    message: '언뽈기븐~암어빌른~30',
    nickname: 'hakikim',
    time: new Date('2020-01-07 20:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 31,
    message: '언뽈기븐~암어빌른~31',
    nickname: 'hakim',
    time: new Date('2020-01-07 21:00:00'),
    type: 'others' as ChatType,
  },
  {
    id: 32,
    message: '언뽈기븐~암어빌른~32',
    nickname: 'hakikim',
    time: new Date('2020-01-11 10:00:01'),
    type: 'others' as ChatType,
  },
  {
    id: 33,
    message: '언뽈기븐~암어빌른~33',
    nickname: 'hakikim',
    time: new Date('2020-01-11 10:00:02'),
    type: 'others' as ChatType,
  },
  {
    id: 34,
    message: '언뽈기븐~암어빌른~34',
    nickname: 'hakikim',
    time: new Date('2020-01-11 12:00:03'),
    type: 'others' as ChatType,
  },
  {
    id: 35,
    message: '언뽈기븐~암어빌른~35',
    nickname: 'hakikim',
    time: new Date('2020-01-15 00:00:04'),
    type: 'others' as ChatType,
  },
  {
    id: 36,
    message: '언뽈기븐~암어빌른~36',
    nickname: 'hakim',
    time: new Date('2020-01-15 00:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 37,
    message: '언뽈기븐~암어빌른~37',
    nickname: 'hakikim',
    time: new Date('2020-01-15 00:00:00'),
    type: 'others' as ChatType,
  },
  {
    id: 38,
    message: '언뽈기븐~암어빌른~38',
    nickname: 'hakikim',
    time: new Date('2020-01-15 00:00:01'),
    type: 'others' as ChatType,
  },
  {
    id: 39,
    message: '언뽈기븐~암어빌른~39',
    nickname: 'hakikim',
    time: new Date('2020-01-16 00:00:02'),
    type: 'others' as ChatType,
  },
  {
    id: 40,
    message: '언뽈기븐~암어빌른~40',
    nickname: 'hakikim',
    time: new Date('2020-01-16 00:00:03'),
    type: 'others' as ChatType,
  },
  {
    id: 41,
    message: '언뽈기븐~암어빌른~41',
    nickname: 'hakikim',
    time: new Date('2020-01-16 00:00:04'),
    type: 'others' as ChatType,
  },
  {
    id: 42,
    message: '언뽈기븐~암어빌른~42',
    nickname: 'hakim',
    time: new Date('2020-01-16 00:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 43,
    message: '언뽈기븐~암어빌른~43',
    nickname: 'hakikim',
    time: new Date('2020-01-17 00:12:00'),
    type: 'others' as ChatType,
  },
  {
    id: 44,
    message: '언뽈기븐~암어빌른~44',
    nickname: 'hakikim',
    time: new Date('2020-01-18 01:00:01'),
    type: 'others' as ChatType,
  },
  {
    id: 45,
    message: '언뽈기븐~암어빌른~45',
    nickname: 'hakikim',
    time: new Date('2020-01-19 19:00:02'),
    type: 'others' as ChatType,
  },
  {
    id: 46,
    message: '언뽈기븐~암어빌른~46',
    nickname: 'hakikim',
    time: new Date('2020-01-20 00:00:03'),
    type: 'others' as ChatType,
  },
  {
    id: 47,
    message: '언뽈기븐~암어빌른~47',
    nickname: 'hakikim',
    time: new Date('2020-01-21 20:00:04'),
    type: 'others' as ChatType,
  },
  {
    id: 48,
    message: '언뽈기븐~암어빌른~48',
    nickname: 'hakikim',
    time: new Date('2020-01-21 22:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 49,
    message: '언뽈기븐~암어빌른~49',
    nickname: 'hakikim',
    time: new Date('2020-01-22 05:00:00'),
    type: 'others' as ChatType,
  },
  {
    id: 50,
    message: '언뽈기븐~암어빌른~50',
    nickname: 'hakikim',
    time: new Date('2020-01-22 07:00:01'),
    type: 'others' as ChatType,
  },
  {
    id: 51,
    message: '언뽈기븐~암어빌른~51',
    nickname: 'hakikim',
    time: new Date('2020-01-22 07:12:02'),
    type: 'others' as ChatType,
  },
  {
    id: 52,
    message: '언뽈기븐~암어빌른~52',
    nickname: 'hakikim',
    time: new Date('2020-01-25 10:00:03'),
    type: 'others' as ChatType,
  },
  {
    id: 53,
    message: '언뽈기븐~암어빌른~53',
    nickname: 'hakikim',
    time: new Date('2020-01-25 20:00:04'),
    type: 'others' as ChatType,
  },
  {
    id: 54,
    message: '언뽈기븐~암어빌른~54',
    nickname: 'hakikim',
    time: new Date('2020-01-26 03:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 55,
    message: '언뽈기븐~암어빌른~55',
    nickname: 'hakikim',
    time: new Date('2020-01-26 09:00:00'),
    type: 'others' as ChatType,
  },
  {
    id: 56,
    message: '언뽈기븐~암어빌른~56',
    nickname: 'hakikim',
    time: new Date('2020-03-01 10:00:01'),
    type: 'others' as ChatType,
  },
  {
    id: 57,
    message: '언뽈기븐~암어빌른~57',
    nickname: 'hakikim',
    time: new Date('2020-03-01 20:00:02'),
    type: 'others' as ChatType,
  },
  {
    id: 58,
    message: '언뽈기븐~암어빌른~58',
    nickname: 'hakikim',
    time: new Date('2020-03-11 08:00:03'),
    type: 'others' as ChatType,
  },
  {
    id: 59,
    message: '언뽈기븐~암어빌른~59',
    nickname: 'hakim',
    time: new Date('2020-03-12 00:00:04'),
    type: 'others' as ChatType,
  },
  {
    id: 60,
    message: '언뽈기븐~암어빌른~60',
    nickname: 'hakikim',
    time: new Date('2020-03-12 11:00:05'),
    type: 'others' as ChatType,
  },
  {
    id: 61,
    message: '언뽈기븐~암어빌른~61',
    nickname: 'hakikim',
    time: new Date('2020-03-12 12:00:00'),
    type: 'others' as ChatType,
  },
  {
    id: 62,
    message: '언뽈기븐~암어빌른~62',
    nickname: 'hakikim',
    time: new Date('2020-03-12 12:10:01'),
    type: 'others' as ChatType,
  },
  {
    id: 63,
    message: '언뽈기븐~암어빌른~63',
    nickname: 'hakikim',
    time: new Date('2020-03-12 12:11:02'),
    type: 'others' as ChatType,
  },
  {
    id: 64,
    message: '언뽈기븐~암어빌른~64',
    nickname: 'hakikim',
    time: new Date('2020-03-12 12:12:03'),
    type: 'others' as ChatType,
  },
  {
    id: 65,
    message: '언뽈기븐~암어빌른~65',
    nickname: 'hakim',
    time: new Date('2020-03-12 12:15:04'),
    type: 'others' as ChatType,
  },
  {
    id: 66,
    message: '언뽈기븐~암어빌른~66',
    nickname: 'hakim',
    time: new Date('2020-03-12 12:17:05'),
    type: 'others' as ChatType,
  },
  {
    id: 67,
    message: '언뽈기븐~암어빌른~67',
    nickname: 'hakikim',
    time: new Date('2020-03-12 12:20:00'),
    type: 'others' as ChatType,
  },
  {
    id: 68,
    message: 'new message',
    nickname: 'hakikim',
    time: new Date(),
    type: 'others' as ChatType,
  },
].reverse();
