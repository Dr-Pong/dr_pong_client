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
  winRate: 72,
  wins: 10,
  ties: 1,
  loses: 4,
};
