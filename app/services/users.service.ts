import type { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

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

export async function logout(request: Request) {
  return await authenticator.logout(request, { redirectTo: '/login' });
}

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
    throw logout(request);
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

export async function getUserDiary({
  userId,
  includeAutoEvents = false,
  year,
}: {
  userId: number;
  includeAutoEvents?: boolean;
  year: number;
}) {
  const whereAnd: Array<Prisma.UserDiaryWhereInput> = [];
  whereAnd.push({
    userId,
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

  return await db.userDiary.findMany({
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
}

export async function getUserPrograms({
  userId,
  year,
}: {
  userId: number;
  year: number;
}) {
  const usersOnPrograms = await db.usersOnPrograms.findMany({
    where: {
      userId,
      program: {
        year,
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
  });

  return usersOnPrograms.map((userPrograms) => ({
    id: userPrograms.program.id,
    name: userPrograms.program.name,
  }));
}

export async function getUserDiaryEvent({ eventId }: { eventId: number }) {
  return await db.userDiary.findUnique({
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
