import type { ParticipantDiaryType, Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

import { db } from './db.server';

export async function getParticipantHealth(id: number) {
  return await db.participantHealth.findUnique({
    where: { participantId: id },
  });
}

export type GetParticipantHealth = Prisma.PromiseReturnType<
  typeof getParticipantHealth
>;

export async function getParticipantBioSurvey(id: number) {
  return await db.surveyBiography.findUnique({
    where: { participantId: id },
  });
}

export type GetParticipantBioSurvey = Prisma.PromiseReturnType<
  typeof getParticipantBioSurvey
>;

export async function getParticipantWithPrograms(id: number, year: number) {
  const participant = await db.participant.findUnique({
    where: { id: +id },
    include: {
      status: true,
      programs: {
        where: {
          program: {
            year,
          },
        },
        select: {
          status: true,
          program: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  if (!participant) {
    return undefined;
  }

  const { programs, ...rest } = participant;

  const cleanPrograms = programs.map((program) => ({
    id: program.program.id,
    name: program.program.name,
    status: program.status,
  }));

  const yearStatus = rest.status.filter((status) => status.year === year)[0];

  return {
    ...rest,
    yearStatus: yearStatus ? yearStatus.status : undefined,
    wasEverActive: !!yearStatus?.wasEverActive,
    allProgramsIds: cleanPrograms.map((program) => program.id),
    programs: {
      active: cleanPrograms.filter((program) => program.status === 'ACTIVE'),
      inactive: cleanPrograms.filter(
        (program) => program.status === 'INACTIVE',
      ),
      waiting: cleanPrograms.filter((program) => program.status === 'WAITING'),
    },
  };
}

export type GetParticipantWithPrograms = Prisma.PromiseReturnType<
  typeof getParticipantWithPrograms
>;

export async function getParticipantDiary({
  participantId,
  includeAutoEvents = false,
  includeProgramEvents = false,
  year,
}: {
  participantId: number;
  includeAutoEvents?: boolean;
  includeProgramEvents?: boolean;
  year: number;
}) {
  console.log(year);
  const whereAnd: Array<Prisma.ParticipantDiaryWhereInput> = [];
  whereAnd.push({
    participantId,
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

  const participantDiary = await db.participantDiary.findMany({
    where: { AND: whereAnd },
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    include: {
      programs: {
        select: {
          program: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  const programEvents = includeProgramEvents
    ? await db.programDiary.findMany({
        where: {
          participants: {
            some: {
              participantId,
            },
          },
          date: {
            gte: DateTime.fromObject({ year, month: 1, day: 1 }).toJSDate(),
            lte: DateTime.fromObject({ year, month: 12, day: 31 }).toJSDate(),
          },
        },
        include: {
          program: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
    : [];

  return [...participantDiary, ...programEvents].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
}

export type GetParticipantDiary = Prisma.PromiseReturnType<
  typeof getParticipantDiary
>;

export async function getParticipantDiaryEvent({
  eventId,
}: {
  eventId: number;
}) {
  return await db.participantDiary.findUnique({
    where: { id: eventId },
    include: {
      programs: {
        select: {
          program: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
}

export type GetParticipantDiaryEvent = Prisma.PromiseReturnType<
  typeof getParticipantDiaryEvent
>;

export async function getParticipantPrograms({
  participantId,
}: {
  participantId: number;
}) {
  const participantsOnPrograms = await db.participantsOnPrograms.findMany({
    where: { participantId },
    include: {
      program: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return participantsOnPrograms.map((participantOnProgram) => ({
    id: participantOnProgram.program.id,
    name: participantOnProgram.program.name,
  }));
}

export type GetParticipantPrograms = Prisma.PromiseReturnType<
  typeof getParticipantPrograms
>;

export async function createParticipantDiaryAutoEvent({
  participantId,
  programId,
  userId,
  title,
  type,
}: {
  participantId: number;
  programId?: number;
  userId: number;
  title: string;
  type: ParticipantDiaryType;
}) {
  const [year, month, day] = DateTime.local({
    zone: 'America/Argentina/Buenos_Aires',
  })
    .toISODate()
    .split('-');

  const programs:
    | Prisma.ParticipantDiaryProgramsCreateNestedManyWithoutParticipantDiaryInput
    | undefined = programId
    ? {
        create: {
          programId,
        },
      }
    : undefined;

  return await db.participantDiary.create({
    data: {
      participantId,
      title,
      type,
      isAutoEvent: true,
      date: DateTime.utc(+year, +month, +day).toJSDate(),
      createdBy: userId,
      updatedBy: userId,
      programs,
    },
  });
}

export type CreateParticipantDiaryAutoEvent = Prisma.PromiseReturnType<
  typeof createParticipantDiaryAutoEvent
>;

export async function updateParticipantYearStatus({
  participantId,
  programId,
  year,
  userId,
  type,
}: {
  participantId: number;
  programId: number;
  year: number;
  userId: number;
  type: ParticipantDiaryType;
}) {
  // We don't include the current program in the query. This is a transaction and the update won't be commited until the transaction is committed. We'll add 1 next to overcome this.
  const yearPrograms = await db.participantsOnPrograms.findMany({
    where: {
      participantId,
      programId: {
        not: programId,
      },
      program: {
        year,
      },
    },
    select: {
      programId: true,
      status: true,
    },
  });

  const participantYearStatus = await db.participantStatus.findUnique({
    where: {
      year_participantId: {
        participantId,
        year,
      },
    },
    select: {
      status: true,
    },
  });

  let waitingPrograms = yearPrograms.filter(
    (p) => p.status === 'WAITING',
  ).length;
  let activePrograms = yearPrograms.filter((p) => p.status === 'ACTIVE').length;
  let inactivePrograms = yearPrograms.filter(
    (p) => p.status === 'INACTIVE',
  ).length;

  if (type === 'PROGRAM_STATUS_ACTIVE') {
    activePrograms += 1;
  }

  if (type === 'PROGRAM_STATUS_INACTIVE_OTHER') {
    inactivePrograms += 1;
  }

  if (type === 'PROGRAM_STATUS_WAITING') {
    waitingPrograms += 1;
  }

  if (activePrograms > 0 && participantYearStatus?.status !== 'ACTIVE') {
    await db.participantStatus.upsert({
      where: {
        year_participantId: {
          participantId,
          year,
        },
      },
      create: {
        status: 'ACTIVE',
        participantId,
        year,
        wasEverActive: true,
      },
      update: {
        status: 'ACTIVE',
        wasEverActive: true,
      },
    });
    return await createParticipantDiaryAutoEvent({
      participantId,
      userId,
      type: 'YEAR_STATUS_ACTIVE',
      title: `El estado del participante en el año ${year} fue cambiado a: activo`,
    });
  } else if (
    waitingPrograms > 0 &&
    activePrograms === 0 &&
    participantYearStatus?.status !== 'WAITING'
  ) {
    await db.participantStatus.upsert({
      where: {
        year_participantId: {
          participantId,
          year,
        },
      },
      create: {
        status: 'WAITING',
        participantId,
        year,
      },
      update: {
        status: 'WAITING',
      },
    });
    return await createParticipantDiaryAutoEvent({
      participantId,
      userId,
      type: 'YEAR_STATUS_WAITING',
      title: `El estado del participante en el año ${year} fue cambiado a: espera`,
    });
  } else if (
    waitingPrograms === 0 &&
    activePrograms === 0 &&
    inactivePrograms > 0 &&
    participantYearStatus?.status !== 'INACTIVE'
  ) {
    await db.participantStatus.upsert({
      where: {
        year_participantId: {
          participantId,
          year,
        },
      },
      create: {
        status: 'INACTIVE',
        participantId,
        year,
      },
      update: {
        status: 'INACTIVE',
      },
    });
    return await createParticipantDiaryAutoEvent({
      participantId,
      userId,
      type: 'YEAR_STATUS_INACTIVE',
      title: `El estado del participante en el año ${year} fue cambiado a: inactivo`,
    });
  }
  return null;
}

export type UpdateParticipantYearStatus = Prisma.PromiseReturnType<
  typeof updateParticipantYearStatus
>;
