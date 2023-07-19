import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

type RoomID = {
  roomID: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error | RoomID>) => {
  if (req.method === 'PATCH') {
    res.status(200).json({ roomID: '1' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: 'Rejected Game Invitation' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
