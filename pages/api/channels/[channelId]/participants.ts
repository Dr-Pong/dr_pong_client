import { NextApiRequest, NextApiResponse } from 'next';

import { ParticipantsResponse } from 'types/chatTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<ParticipantsResponse | Error>
) => {
  const { roomId } = req.query;

  if (req.method === 'GET') {
    res.status(200).json(participants);
  } else if (req.method === 'POST') {
    // if (req.body.password === '1234')
    res.status(200).json({ message: `Channel ${roomId} Joined` });
    // else
    //   res.status(400).json({ message: 'full bang | wrong password | private | no bang' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: `Channel ${roomId} Leaved` });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const participants: ParticipantsResponse = {
  me: {
    nickname: 'keokim',
    imgUrl:
      'https://avatars.githubusercontent.com/u/76714659?s=80&u=2f6bd0411edb429ea9336c1ecbad0b0858ae6e09&v=4?imwidth=100',
    roleType: 'owner',
    isMuted: false,
  },
  participants: [
    {
      nickname: 'hakim1',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      roleType: 'admin',
      isMuted: false,
    },
    {
      nickname: 'hakim3',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      roleType: 'admin',
      isMuted: false,
    },
    {
      nickname: 'hakim5',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      roleType: 'admin',
      isMuted: false,
    },
    {
      nickname: 'hakim0',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      roleType: 'admin',
      isMuted: false,
    },
    {
      nickname: 'jihyukim',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jihyukim.jpeg?imwidth=100',
      roleType: 'admin',
      isMuted: false,
    },
    {
      nickname: 'jaehwkim',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jaehwkim.jpeg?imwidth=100',
      roleType: 'normal',
      isMuted: true,
    },
    {
      nickname: 'nheo',
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/nheo.jpeg?imwidth=100',
      roleType: 'normal',
      isMuted: true,
    },
    {
      nickname: 'junyopar',
      imgUrl:
        'https://cdn.intra.42.fr/users/2b7fa00f10e453fd9473b2edaba13bda/junyopar.jpg',
      roleType: 'normal',
      isMuted: false,
    },
  ],
  headCount: 6,
  maxCount: 10,
};
