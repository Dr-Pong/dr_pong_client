import { NextApiRequest, NextApiResponse } from 'next';

import { Invitation } from 'types/notificationTypes';

type Error = {
  message: string;
};

type ChannelNotiResponse = {
  invitations: Invitation[];
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<ChannelNotiResponse | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json({
      invitations: channelInvitations,
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const channelInvitations = [
  {
    id: '1',
    channelId: '1',
    channelName: '파이썬 초보만',
    from: 'hakim',
    createdAt: new Date(2023, 5, 23, 3, 24, 0),
  },
  {
    id: '2',
    channelId: '2',
    channelName: '파이썬 중수만',
    from: 'iakim',
    createdAt: new Date(2023, 5, 19, 3, 24, 0),
  },
  {
    id: '3',
    channelId: '3',
    channelName: '파이썬 고수만',
    from: 'jakim',
    createdAt: new Date(2023, 5, 18, 3, 24, 0),
  },
  {
    id: '4',
    channelId: '4',
    channelName: '파이썬 마스터만',
    from: 'kakim',
    createdAt: new Date(2023, 5, 15, 3, 24, 0),
  },
];
