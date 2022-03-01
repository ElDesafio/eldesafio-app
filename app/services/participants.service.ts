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
