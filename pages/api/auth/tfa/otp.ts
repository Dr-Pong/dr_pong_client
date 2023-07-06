import { NextApiRequest, NextApiResponse } from 'next';

import { TokenResponse } from 'hooks/useAuthHandler';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse | Error>
) => {
  if (req.method === 'POST') {
    res.status(200).json({ accessToken: 'hi' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
