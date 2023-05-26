import { NextApiRequest, NextApiResponse } from 'next';

import { Invitation } from 'types/notificationTypes';

type Error = {
  message: string;
};

type GameNotiResponse = {
  invitations: Invitation[];
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<GameNotiResponse | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json({
      invitations: gameInvitations,
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const gameInvitations = [
  {
    from: 'hakim',
    createdAt: new Date(2023, 5, 20, 3, 24, 0),
  },
  {
    from: 'hakim',
    createdAt: new Date(2023, 5, 16, 3, 24, 0),
  },
  {
    from: 'hakim',
    createdAt: new Date(2023, 5, 16, 2, 24, 0),
  },
];
