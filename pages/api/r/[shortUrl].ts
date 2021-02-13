import isbot from 'isbot';
import type { NextApiRequest, NextApiResponse } from 'next';

import Url, { IUrl } from '../../../models/Url';
import DatabaseService from '../../../services/database';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    query: { shortUrl },
    headers,
  } = req;
  const userAgent = headers['user-agent'];

  console.log('User-Agent:', userAgent);
  console.log('isbot?:', isbot.find(userAgent));

  DatabaseService.connect();
  let url: IUrl | IUrl[];

  try {
    switch (method) {
      case 'GET':
        url = await Url.findOne({ shortUrl: shortUrl as string });
        if (url == null) {
          return (res.status(404) as unknown) as void;
        }
        if (!isbot(userAgent)) {
          url.clicks++;
          url.save();
        }
        res.redirect(url.longUrl);
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res
          .status(405)
          .end(JSON.stringify({ error: `Method ${method} Not Allowed` }));
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
