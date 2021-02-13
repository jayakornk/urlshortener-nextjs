// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';

import User, { IUser } from '../../models/User';
import DatabaseService from '../../services/database';

const secret = process.env.JWT_SECRET;
const signingKey = process.env.JWT_SIGNING_PRIVATE_KEY;

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  DatabaseService.connect();
  let user: IUser | IUser[];
  const token = await jwt.getToken({ req, secret, signingKey });
  console.log('JSON Web Token', token);

  try {
    if (req.method === 'POST') {
      const { name, email } = req.body;
      user = new User({
        name,
        email,
      });
      await user.save();
    }

    if (req.method === 'GET') {
      user = await User.find();
    }
    // const user = await User.find();

    console.log(user);
    // res.status(200).json({ user });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
