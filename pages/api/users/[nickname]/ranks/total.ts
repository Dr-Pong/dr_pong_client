import { NextApiRequest, NextApiResponse } from 'next';

import { UserRank } from 'types/userTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<UserRank | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json(stat);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const stat: UserRank = {
  bestLp: 5000,
  rank: 1,
  tier: 'doctor',
};
