import type { LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { z } from 'zod';

import { db } from '~/services/db.server';
import { getLoggedInUser } from '~/services/users.service';

export async function loader({ request, params }: LoaderArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);
  const url = new URL(request.url);

  const programsIdsSearchParam = url.searchParams
    .getAll('programId')
    .map((programId) => +programId);

  const classes = await db.class.findMany({
    where: {
      programId: {
        in: programsIdsSearchParam,
      },
      participants: {
        some: {
          participantId: +id,
        },
      },
    },
    include: {
      participants: {
        where: {
          participantId: +id,
        },
        select: {
          status: true,
        },
      },
    },
  });

  return typedjson({
    classes: classes.map((classItem) => {
      return {
        date: classItem.date,
        isRainyDay: classItem.isRainyDay,
        participants: classItem.participants,
      };
    }),
  });
}
