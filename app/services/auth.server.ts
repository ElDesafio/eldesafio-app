import type { User } from '@prisma/client';
import { redirect } from '@remix-run/server-runtime';
import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';

import { db } from './db.server';
import { sessionStorage } from './session.server';

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export let authenticator = new Authenticator<User | null>(sessionStorage);

const callbackURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/auth/auth0/callback'
    : 'https://app.eldesafio.org/auth/auth0/callback';

let auth0Strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
    const user = await db.user.findUnique({
      where: { email: profile.emails[0].value },
    });

    if (!user) redirect('/login?error=user_not_found');
    return user;
  },
);

authenticator.use(auth0Strategy);
