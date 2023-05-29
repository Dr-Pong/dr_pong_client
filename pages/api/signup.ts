import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  const { nickname, imgId } = req.body;
  if (req.method === 'POST' && nickname && imgId) {
    res.status(200).json({ message: 'success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
