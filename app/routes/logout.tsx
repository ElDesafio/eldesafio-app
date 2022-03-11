import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect } from 'remix';

import { authenticator } from '~/services/auth.server';
import { destroySession, getSession } from '~/services/session.server';

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};

export let action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};
