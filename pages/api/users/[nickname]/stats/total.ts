import { NextApiRequest, NextApiResponse } from 'next';

import { UserStat } from 'types/userTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<UserStat | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json(stat);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const stat = {
  wins: 100,
  ties: 5,
  loses: 50,
  winRate: 67.5,
};
