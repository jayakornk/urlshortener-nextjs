import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.NEXTAUTH_GITHUB_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
    }),
    // Providers.LINE({
    //   clientId: process.env.NEXTAUTH_LINE_CLIENT_ID,
    //   clientSecret: process.env.NEXTAUTH_LINE_CLIENT_SECRET,
    // }),
  ],
  database: process.env.NEXTAUTH_DATABASE_URL,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  debug: true,
};

const Auth = (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, options);

export default Auth;
