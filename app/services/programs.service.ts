import type { Prisma } from '@prisma/client';
import { ParticipantsOnProgramsStatus } from '@prisma/client';

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
        orderBy: {
          participant: {
            firstName: 'asc',
          },
        },
        include: {
          participant: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              birthday: true,
              picture: true,
            },
          },
        },
      },
      createdByUser: true,
      updatedByUser: true,
    },
  });
}

export type GetProgram = Prisma.PromiseReturnType<typeof getProgram>;

export async function getProgramParticipants({
  programId,
  includeStatus = [ParticipantsOnProgramsStatus.ACTIVE],
}: {
  programId: number;
  includeStatus?: ParticipantsOnProgramsStatus[];
}) {
  const whereAnd: Array<Prisma.ParticipantsOnProgramsWhereInput> = [];

  whereAnd.push({ programId });

  if (includeStatus) {
    whereAnd.push({
      OR: [
        { status: { in: includeStatus } },
        {
          wasEverActive: includeStatus.includes('INACTIVE') ? true : undefined,
        },
      ],
    });
  }

  const participantsOnPrograms = await db.participantsOnPrograms.findMany({
    where: {
      AND: whereAnd,
    },
    orderBy: {
      participant: {
        firstName: 'asc',
      },
    },
    include: {
      participant: {
        select: {
          firstName: true,
          lastName: true,
          picture: true,
          birthday: true,
        },
      },
    },
  });

  return participantsOnPrograms.map((participantOnProgram) => {
    const { participant, ...rest } = participantOnProgram;

    return {
      ...rest,
      ...participant,
      programStatus: rest.status,
    };
  });
}

export type GetProgramParticipants = Prisma.PromiseReturnType<
  typeof getProgramParticipants
>;
