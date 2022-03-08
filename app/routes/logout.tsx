import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect } from 'remix';

import { destroySession, getSession } from '~/services/session.server';

export let action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);

  logoutURL.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID);
  logoutURL.searchParams.set('returnTo', process.env.BASE_URL);

  return redirect(logoutURL.toString(), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export let loader: LoaderFunction = () => {
  throw redirect('/');
};
