import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

import { db } from '~/services/db.server';
import { getLoggedInUser } from '~/services/users.service';

export type GlobalSearchResult = {
  label: string;
  value: number;
  type: 'participant' | 'school' | 'program';
};

export async function loader({ request, params }: LoaderArgs) {
  await getLoggedInUser(request);

  const url = new URL(request.url);
  const value = url.searchParams.get('value')?.trim() ?? '';

  const cleanValue = value
    .split(' ')
    .map((word) => (word.trim().length > 0 ? `${word.trim()}:*` : ''))
    .join(' | ');

  const participants = await db.participant.findMany({
    where: {
      OR: [
        {
          firstName: {
            search: cleanValue,
          },
          lastName: {
            search: cleanValue,
          },
          // dni: {
          //   search: cleanValue.replace(/[^\d.-]/g, ''),
          // },
        },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  const programs = await db.program.findMany({
    where: {
      name: {
        search: cleanValue,
      },
    },
    orderBy: {
      year: 'desc',
    },
    select: {
      id: true,
      name: true,
      year: true,
    },
  });

  const schools = await db.school.findMany({
    where: {
      name: {
        search: cleanValue,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const cleanParticipants: GlobalSearchResult[] = participants.map(
    (participant) => ({
      label: `${participant.firstName} ${participant.lastName}`,
      value: participant.id,
      type: 'participant',
    }),
  );
  const cleanPrograms: GlobalSearchResult[] = programs.map((program) => ({
    label: `${program.name} (${program.year})`,
    value: program.id,
    type: 'program',
  }));

  const cleanSchools: GlobalSearchResult[] = schools.map((school) => ({
    label: school.name,
    value: school.id,
    type: 'school',
  }));

  return json([...cleanParticipants, ...cleanPrograms, ...cleanSchools]);
}
