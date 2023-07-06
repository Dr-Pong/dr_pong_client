import { NextApiRequest, NextApiResponse } from 'next';

import { AuthCode } from 'types/authTypes';

import { TokenResponse } from 'hooks/useAuthHandler';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<AuthCode | TokenResponse | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json(registerCode);
  } else if (req.method === 'POST') {
    res.status(200).json({ accessToken: 'hi' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const registerCode = {
  redirectionUrl: 'https://google-auth-musigi.com',
  qrCode:
    'https://www.jj.ac.kr/_custom/jj/_common/board/qrcode.jsp?paint=Y&url=aHR0cDovL3d3dy5qai5hYy5rci9fY3VzdG9tL2pqL19jb21tb24vYm9hcmQvZG93bmxvYWQuanNwP2F0dGFjaF9ubz04NDY5Nw==&mode=BU',
  secretKey: '0123456789012345',
};
