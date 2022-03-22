import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';

import { getLoggedInUser } from '~/services/users.service';

export let loader: LoaderFunction = async ({ request }) => {
  const loggedinUser = await getLoggedInUser(request);

  if (loggedinUser?.status === 'INACTIVE') {
    redirect('/logout');
  }

  return redirect('/participants');
};
