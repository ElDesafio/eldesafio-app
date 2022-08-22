import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

import { db } from '~/services/db.server';

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const schoolName = url.searchParams.get('schoolName') ?? '';

  const schools = await db.school.findMany({
    where: {
      name: {
        contains: schoolName,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return json(schools);
};
