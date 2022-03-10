import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect } from 'remix';

import { destroySession, getSession } from '~/services/session.server';

export let action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export let loader: LoaderFunction = () => {
  throw redirect('/');
};
