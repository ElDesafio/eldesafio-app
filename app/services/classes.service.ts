import type { Prisma } from '@prisma/client';

import { db } from './db.server';

export async function getProgramClasses({ programId }: { programId: number }) {
  const classes = await db.class.findMany({
    where: { programId },
    include: {
      participants: {
        select: {
          participantId: true,
          status: true,
          participant: {
            select: {
              firstName: true,
              lastName: true,
              picture: true,
              birthday: true,
            },
          },
        },
      },
    },
  });

  return classes.map((c) => {
    const { participants, ...rest } = c;
    return {
      ...rest,
      participants: participants.map((p) => {
        const { participant, ...rest } = p;
        return {
          ...rest,
          ...participant,
        };
      }),
    };
  });
}

export type GetProgramClasses = Prisma.PromiseReturnType<
  typeof getProgramClasses
>;
