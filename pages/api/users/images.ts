import { NextApiRequest, NextApiResponse } from 'next';

import { UserImages } from 'types/userTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<UserImages | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json(userImages);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const userImages = {
  images: [
    {
      id: 1,
      imgUrl: '',
    },
    {
      id: 2,
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      id: 3,
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      id: 4,
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      id: 5,
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
  ],
};
