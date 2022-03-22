import type { Prisma } from '@prisma/client';

import {
  isAdmin,
  isFacilitator,
  isFacilitatorVolunteer,
  isMentor,
} from '~/util/utils';

import { authenticator } from './auth.server';
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

/** It checks */
export async function getLoggedInUser(request: Request) {
  const authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const user = await db.user.findUnique({
    where: { id: authUser.id },
    select: {
      id: true,
      status: true,
      firstName: true,
      lastName: true,
      timezone: true,
      roles: true,
    },
  });

  if (!user) {
    throw new Error('[getLoggedInUser] User not found');
  }

  return {
    ...user,
    isAdmin: isAdmin(user),
    isFacilitator: isFacilitator(user),
    isFacilitatorVolunteer: isFacilitatorVolunteer(user),
    isMentor: isMentor(user),
  };
}

export type GetLoggedInUser = Prisma.PromiseReturnType<typeof getLoggedInUser>;

export async function getFacilitators({
  includeInactive = false,
}: {
  includeInactive?: boolean;
}) {
  const andWhere: Prisma.UserWhereInput[] = [
    { roles: { some: { role: 'FACILITATOR' } } },
  ];
  if (includeInactive) {
    andWhere.push({ status: { not: 'INACTIVE' } });
  }

  return await db.user.findMany({
    where: {
      AND: andWhere,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
}

export type GetFacilitators = Prisma.PromiseReturnType<typeof getFacilitators>;

export async function getVolunteers({
  includeInactive = false,
}: {
  includeInactive?: boolean;
}) {
  const andWhere: Prisma.UserWhereInput[] = [
    { roles: { some: { role: 'FACILITATOR_VOLUNTEER' } } },
  ];
  if (includeInactive) {
    andWhere.push({ status: { not: 'INACTIVE' } });
  }

  return await db.user.findMany({
    where: {
      AND: andWhere,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
}

export type GetVolunteers = Prisma.PromiseReturnType<typeof getFacilitators>;
