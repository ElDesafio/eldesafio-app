import type { Prisma } from '@prisma/client';
import { ParticipantsOnProgramsStatus } from '@prisma/client';
import { DateTime } from 'luxon';

import { db } from './db.server';

export async function getProgram({
  id,
  includeParticipants = false,
}: {
  id: number;
  includeParticipants?: boolean;
}) {
  // TODO: Fix this. Right now the flag is ignored.
  // const participants = includeParticipants
  //   ? { include: { participant: true } }
  //   : false;

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

  return participantsOnPrograms
    .map((participantOnProgram) => {
      const { participant, ...rest } = participantOnProgram;

      return {
        ...rest,
        ...participant,
        programStatus: rest.status,
      };
    })
    .sort((a) => (a.programStatus === 'ACTIVE' ? -1 : 1));
}

export type GetProgramParticipants = Prisma.PromiseReturnType<
  typeof getProgramParticipants
>;

export async function getProgramDiary({
  programId,
  includeAutoEvents = false,
  year,
}: {
  programId: number;
  includeAutoEvents?: boolean;
  year: number;
}) {
  const whereAnd: Array<Prisma.ProgramDiaryWhereInput> = [];
  whereAnd.push({
    programId,
    date: {
      gte: DateTime.fromObject({ year, month: 1, day: 1 }).toJSDate(),
      lte: DateTime.fromObject({ year, month: 12, day: 31 }).toJSDate(),
    },
  });
  if (!includeAutoEvents) {
    whereAnd.push({
      isAutoEvent: false,
    });
  }

  const programDiary = await db.programDiary.findMany({
    where: { AND: whereAnd },
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    include: {
      participants: {
        select: {
          participant: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              picture: true,
            },
          },
        },
      },
    },
  });

  const participantsDiary = await db.participantDiary.findMany({
    where: {
      isAutoEvent: includeAutoEvents === true ? undefined : false,
      date: {
        gte: DateTime.fromObject({ year, month: 1, day: 1 }).toJSDate(),
        lte: DateTime.fromObject({ year, month: 12, day: 31 }).toJSDate(),
      },
      programs: {
        some: {
          programId,
        },
      },
    },
    include: {
      participant: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          picture: true,
        },
      },
    },
  });

  return [...programDiary, ...participantsDiary].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
}

export async function getProgramDiaryEvent({ eventId }: { eventId: number }) {
  return await db.programDiary.findUnique({
    where: { id: eventId },
    include: {
      participants: {
        select: {
          participant: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              picture: true,
            },
          },
        },
      },
    },
  });
}
