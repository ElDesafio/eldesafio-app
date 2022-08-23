import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { getLoggedInUser } from '~/services/users.service';

export async function loader({ request }: LoaderArgs) {
  const loggedinUser = await getLoggedInUser(request);

  if (loggedinUser?.status === 'INACTIVE') {
    redirect('/logout');
  }

  return redirect('/participants');
}
