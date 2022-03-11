import type { User } from '@prisma/client';
import { redirect } from 'remix';
import { Authenticator, AuthorizationError } from 'remix-auth';
import { EmailLinkStrategy } from 'remix-auth-email-link';

import { db } from './db.server';
import { sendMagicLinkEmail } from './email.server';
import { destroySession, getSession, sessionStorage } from './session.server';

// This secret is used to encrypt the token sent in the magic link and the
// session used to validate someone else is not trying to sign-in as another
// user.
let secret = process.env.MAGIC_LINK_SECRET;
if (!secret) throw new Error('Missing MAGIC_LINK_SECRET env variable.');

export let authenticator = new Authenticator<User>(sessionStorage);

// Here we need the sendEmail, the secret and the URL where the user is sent
// after clicking on the magic link
authenticator.use(
  new EmailLinkStrategy(
    {
      sendEmail: sendMagicLinkEmail,
      secret,
      callbackURL: `/auth/magic-link/callback`,
      validateSessionMagicLink: true,
    },
    // In the verify callback you will only receive the email address and you
    // should return the user instance
    async ({ email }: { email: string }) => {
      const user = await db.user.findUnique({ where: { email } });
      if (!user) throw new AuthorizationError('User not found');
      if (user.status === 'INVITED') {
        await db.user.update({
          where: { id: user.id },
          data: { status: 'ACTIVE' },
        });
      }
      if (user.status === 'INACTIVE') {
        throw new Error('User is inactive');
      }
      return user;
    },
  ),
);
