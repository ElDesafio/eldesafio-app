import type { LoaderArgs } from '@remix-run/node';
import { z } from 'zod';

import { db } from '~/services/db.server';

export async function loader({ request, params }: LoaderArgs) {
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

  return classes.map((classItem) => {
    return {
      date: classItem.date,
      isRainyDay: classItem.isRainyDay,
      participants: classItem.participants,
    };
  });
}
