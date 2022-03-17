import type { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

import { db } from './db.server';

export async function getProgramClasses({
  programId,
  month,
}: {
  programId: number;
  month?: number;
}) {
  const program = await db.program.findUnique({
    where: { id: programId },
    select: { year: true, description: true },
  });
  if (!program) throw new Error("Program doesn't exist");

  const whereAnd: Array<Prisma.ClassWhereInput> = [];
  whereAnd.push({ programId });

  if (month != null) {
    // 0 is the value for the entire year
    if (month === 0) {
      whereAnd.push({
        date: {
          gte: new Date(`${program.year}-01-01`),
          lte: new Date(`${program.year}-12-31`),
        },
      });
    } else {
      let dateFromLuxon = DateTime.utc(program.year, month, 1).setLocale(
        'es-ES',
      );

      const dateTo = DateTime.utc(
        program.year,
        month,
        dateFromLuxon.daysInMonth,
      )
        .setLocale('es-ES')
        .toISODate();
      const dateFrom = dateFromLuxon.toISODate();

      whereAnd.push({
        date: {
          gte: new Date(dateFrom),
          lte: new Date(dateTo),
        },
      });
    }
  } else {
    // If there is no month in the search params, we'll assume the current month
    let dateFromLuxon = DateTime.utc(
      program.year,
      DateTime.utc().month,
      1,
    ).setLocale('es-ES');

    const dateTo = DateTime.utc(
      program.year,
      DateTime.utc().month,
      dateFromLuxon.daysInMonth,
    )
      .setLocale('es-ES')
      .toISODate();
    const dateFrom = dateFromLuxon.toISODate();

    whereAnd.push({
      date: {
        gte: new Date(dateFrom),
        lte: new Date(dateTo),
      },
    });
  }

  const classes = await db.class.findMany({
    where: {
      AND: whereAnd,
    },
    orderBy: {
      date: 'asc',
    },
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

export async function getClass(id: number) {
  const classItem = await db.class.findUnique({
    where: { id },
    include: {
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
              picture: true,
              birthday: true,
            },
          },
        },
      },
    },
  });

  if (!classItem) return;

  const attendants = await Promise.all(
    classItem.participants.map(async (participant) => {
      const participantOnProgram = await db.participantsOnPrograms.findUnique({
        where: {
          programId_participantId: {
            participantId: participant.participantId,
            programId: classItem.programId,
          },
        },
        select: {
          wasEverActive: true,
          status: true,
        },
      });

      if (!participantOnProgram) {
        throw new Error(`[getClass] Error getting participant on program.`);
      }

      return {
        participantId: participant.participantId,
        status: participant.status,
        wasEverActive: participantOnProgram.wasEverActive,
        programStatus: participantOnProgram.status,
        ...participant.participant,
      };
    }),
  );

  attendants.sort((a) => (a.programStatus === 'ACTIVE' ? -1 : 1));

  return {
    date: classItem.date,
    isRainyDay: classItem.isRainyDay,
    id: classItem.id,
    attendants,
  };
}

export type GetClass = Prisma.PromiseReturnType<typeof getClass>;
