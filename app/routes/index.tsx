import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';

import { authenticator } from '~/services/auth.server';
import { getLoggedInUser } from '~/services/users.service';

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const loggedinUser = await getLoggedInUser(user.id);

  if (loggedinUser?.status === 'INACTIVE') {
    redirect('/logout');
  }

  return redirect('/participants');
};
