import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  const { nickname, mode } = req.body;

  if (req.method === 'POST') {
    res.status(200).json({
      message: `invitation to ${nickname} for ${mode} game has been sent successfully`,
    });
  } else if (req.method === 'DELETE')
    res.status(200).json({ message: 'Canceled Invitation' });
  else res.status(405).json({ message: 'Method Not Allowed' });
};
