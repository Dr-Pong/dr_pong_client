import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

type UserTfa = {
  tfaOn: boolean;
};

export default (req: NextApiRequest, res: NextApiResponse<UserTfa | Error>) => {
  if (req.method === 'GET') {
    res.status(200).json(userTfa);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const userTfa = {
  tfaOn: true,
};
