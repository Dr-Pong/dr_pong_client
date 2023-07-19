import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  const { gameType } = req.query;
  const { mode } = req.body;
  if (req.method === 'POST') {
    if (gameType === 'ladder')
      res.status(200).json({ message: `Waiting For Normal Match` });
    else if (gameType === 'normal')
      res.status(200).json({ message: `Waiting For Normal Match (${mode})` });
    else res.status(405).json({ message: 'Method Not Allowed' });
  } else res.status(405).json({ message: 'Method Not Allowed' });
};
