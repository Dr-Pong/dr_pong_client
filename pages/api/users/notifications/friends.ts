import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

type FriendRequestNotiResponse = {
  requestCount: number;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<FriendRequestNotiResponse | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json({
      requestCount: 3,
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
