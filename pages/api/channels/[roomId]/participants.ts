import { NextApiRequest, NextApiResponse } from 'next';

import { ChannelParticipants } from 'types/channelTypes';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<ChannelParticipants | Error>) => {
  const { roomId } = req.query;

  if (req.method === 'GET') {

  } else if (req.method === 'POST') {
    // if (req.body.password === '1234')
    res.status(200).json({ message: `Channel${roomId} Joined` });
    // else
    //   res.status(400).json({ message: 'full bang | wrong password | private | no bang' });
  } else if (req.method === 'DELETE') {

  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}