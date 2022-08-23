import type { ActionArgs, LoaderArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
  await authenticator.logout(request, { redirectTo: '/login' });
}

export async function action({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: '/login' });
}
