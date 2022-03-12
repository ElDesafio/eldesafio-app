import type { Prisma } from '@prisma/client';

import { db } from './db.server';

export async function getProgram({
  id,
  includeParticipants = false,
}: {
  id: number;
  includeParticipants?: boolean;
}) {
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
      participants: includeParticipants,
      createdByUser: true,
      updatedByUser: true,
    },
  });
}

export type GetProgram = Prisma.PromiseReturnType<typeof getProgram>;
