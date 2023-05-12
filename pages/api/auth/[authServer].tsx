import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  accessToken: string;
};
type Error = {
  message: string;
};
export default (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  if (req.method === 'POST') {
    res.status(200).json({
      accessToken: 'accessToken',
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
