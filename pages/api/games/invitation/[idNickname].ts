import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

type GameId = {
  gameId: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error | GameId>) => {
  if (req.method === 'PATCH') {
    res.status(200).json({ gameId: '1' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: 'Rejected Game Invitation' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
