// Use this to get the magic link for each role
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/get-magic-link.ts admin
// and it will give you the magic link to visit to login the user.

import { installGlobals } from '@remix-run/node';

import { emailLinkStrategy } from '../../app/services/auth.server';

installGlobals();

export type GetMagicLinkArgs = {
  role:
    | /** lucas.curti@eldesafio.org */ 'admin'
    | /** not yet created */ 'facilitator'
    | /** not yet created */ 'volunteer';
};

async function getMagicLink({ role }: GetMagicLinkArgs) {
  try {
    let email: string;

    switch (role) {
      case 'admin':
        email = 'lucas.curti@eldesafio.org';
        break;
      case 'facilitator':
        email = 'not@yet.implemented';
        break;
      case 'volunteer':
        email = 'not@yet.implemented';
        break;
      default:
        throw new Error(`'role' option wasn't provided for getMagicLink()`);
    }

    const form = new FormData();

    form.append('email', email);

    const magicLink = await emailLinkStrategy.getMagicLink(
      email,
      process.env.BASE_URL,
      form,
    );

    // we log it like this so our cypress command can parse it out and set it as
    // the cookie value.
    console.log(
      `
  <magicLink>
    ${magicLink}
  </magicLink>
    `.trim(),
    );
  } catch (error) {
    console.log(error);
  }
}

const choosenRole = process.argv[2];

if (
  choosenRole !== 'admin' &&
  choosenRole !== 'facilitator' &&
  choosenRole !== 'volunteer'
) {
  throw new Error(`invalid choosen role`);
}

getMagicLink({ role: choosenRole });
