import type { LoaderArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
  await authenticator.authenticate('email-link', request, {
    // If the user was authenticated, we redirect them to their profile page
    // This redirect is optional, if not defined the user will be returned by
    // the `authenticate` function and you can render something on this page
    // manually redirect the user.
    successRedirect: '/',
    // If something failed we take them back to the login page
    // This redirect is optional, if not defined any error will be throw and
    // the ErrorBoundary will be rendered.
    failureRedirect: '/login',
  });
}
