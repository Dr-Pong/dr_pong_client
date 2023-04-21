import { NextApiRequest, NextApiResponse } from 'next';

import {
  Achievement,
  Emoji,
  Title,
  UserDetail,
  UserStat,
} from 'types/myPageTypes';

export default (
  req: NextApiRequest,
  res: NextApiResponse<
    UserDetail | UserStat | Emoji[] | Achievement[] | Title[]
  >
) => {
  const {
    query: { nickname, selected },
  } = req;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  switch (nickname[1]) {
    case 'detail':
      res.status(200).json({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nickname: nickname[0],
        imgUrl:
          'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
        level: 30,
        title: 'the Boss',
        statusMessage: 'I am the boss',
      });
      return;
    case 'stat':
      res.status(200).json(stat);
      return;
    case 'achievements':
      if (selected) {
        res.status(200).json(selectedAchievements);
      } else {
        res.status(200).json(achievements);
      }
      return;
    case 'emojis':
      if (selected) {
        res.status(200).json(selectedEmojis);
      } else {
        res.status(200).json(emojis);
      }
      return;
    case 'titles':
      res.status(200).json(titles);
  }
};

const stat = {
  totalStat: {
    win: 100,
    ties: 5,
    lose: 50,
    winRate: 67.5,
  },
  seasonStat: {
    winRate: 72,
    win: 10,
    ties: 1,
    lose: 4,
    record: 3190,
    rank: 120,
  },
  bestStat: {
    record: 5000,
    rank: 1,
  },
};

const selectedAchievements = [
  {
    id: 1,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'selected',
  },
  {
    id: 2,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'selected',
  },
  {
    id: 3,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'selected',
  },
];

const achievements = [
  {
    id: 1,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'selected',
  },
  {
    id: 2,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'selected',
  },
  {
    id: 3,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'selected',
  },
  {
    id: 4,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'unachieved',
  },
  {
    id: 5,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'achieved',
  },
  {
    id: 6,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'achieved',
  },
  {
    id: 7,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'achieved',
  },
  {
    id: 8,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'unachieved',
  },
  {
    id: 9,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'unachieved',
  },
  {
    id: 10,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'achieved',
  },
  {
    id: 11,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'unachieved',
  },
  {
    id: 12,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'unachieved',
  },
];

const selectedEmojis = [
  {
    id: 1,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'selected',
  },
  {
    id: 2,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'selected',
  },
  {
    id: 3,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'selected',
  },
];

const emojis = [
  {
    id: 1,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 2,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 3,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 4,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 5,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'unachieved',
  },
  {
    id: 6,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 7,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'unachieved',
  },
  {
    id: 8,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'unachieved',
  },
  {
    id: 9,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 10,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 11,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 12,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
];

const titles = [
  {
    id: 1,
    title: 'I am the boss',
  },
  {
    id: 2,
    title: 'I am the badass',
  },
  {
    id: 3,
    title: 'I am the king',
  },
  {
    id: 4,
    title: 'I am the queen',
  },
  {
    id: 5,
    title: 'I am the fool',
  },
  {
    id: 6,
    title: 'I am the idiot',
  },
  {
    id: 7,
    title: 'the beginner',
  },
  {
    id: 8,
    title: 'the intermediate',
  },
  {
    id: 9,
    title: 'the advanced',
  },
  {
    id: 10,
    title: 'the legend',
  },
  {
    id: 11,
    title: 'the master',
  },
  {
    id: 12,
    title: 'Dr. Pong',
  },
];
