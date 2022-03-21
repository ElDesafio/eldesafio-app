import type { Prisma } from '@prisma/client';

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

export async function getParticipantWithPrograms(id: number) {
  const participant = await db.participant.findUnique({
    where: { id: +id },
    include: {
      programs: {
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

  return {
    ...rest,
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
}: {
  participantId: number;
}) {
  return await db.participantDiary.findMany({
    where: { participantId },
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
