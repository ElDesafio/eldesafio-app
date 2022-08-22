import type { ActionArgs, LoaderArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';

export let loader = async ({ request }: LoaderArgs) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};

export let action = async ({ request }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};
