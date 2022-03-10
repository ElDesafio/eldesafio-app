import type { Prisma } from '@prisma/client';

import { db } from './db.server';

export async function getUser(id: number) {
  return await db.user.findUnique({
    where: { id },
    include: {
      roles: { orderBy: { role: 'asc' } },
    },
  });
}

export type GetUser = Prisma.PromiseReturnType<typeof getUser>;

export async function getLoggedInUser(id: number) {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      roles: true,
    },
  });
}

export type GetLoggedInUser = Prisma.PromiseReturnType<typeof getLoggedInUser>;
