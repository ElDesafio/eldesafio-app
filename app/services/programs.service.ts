import type { Prisma } from '@prisma/client';

import { db } from './db.server';

export async function getProgram({
  id,
  includeParticipants = false,
}: {
  id: number;
  includeParticipants?: boolean;
}) {
  // TODO: Fix this. Right now the flag is ignored.
  const participants = includeParticipants
    ? { include: { participant: true } }
    : false;

  return await db.program.findUnique({
    where: { id },
    include: {
      programDays: true,
      educators: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      participants: {
        include: {
          participant: { select: { firstName: true, lastName: true } },
        },
      },
      createdByUser: true,
      updatedByUser: true,
    },
  });
}

export type GetProgram = Prisma.PromiseReturnType<typeof getProgram>;
