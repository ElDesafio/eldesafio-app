import type { LoaderFunction } from 'remix';
import { json } from 'remix';

import { db } from '~/services/db.server';

export type GlobalSearchResult = {
  label: string;
  value: number;
  type: 'participant' | 'school' | 'program';
};

export const loader: LoaderFunction = async ({ request, params }) => {
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
};
