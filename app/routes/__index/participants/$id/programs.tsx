import { SimpleGrid } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import {
  ActionFunction,
  LoaderFunction,
  useLoaderData,
  useSearchParams,
} from 'remix';
import { z } from 'zod';

import { db } from '~/services/db.server';

import { ProgramBox } from './components/ProgramBox';
import { Prisma } from '.prisma/client';

export enum FormTypeAddToProgram {
  ACTIVE = 'ACTIVE',
  WAITING = 'WAITING',
}

async function getProgramsByYear(year: number) {
  return await db.program.findMany({
    where: {
      year: year,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const selectedYear = url.searchParams.get('year') ?? DateTime.now().year;
  const programs = await getProgramsByYear(+selectedYear);
  return programs;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const form = await request.formData();
  const programId = z.string().parse(form.get('programId'));

  switch (form.get('type') as FormTypeAddToProgram) {
    case FormTypeAddToProgram.ACTIVE:
      console.log('ACTIVE');
      break;
    case FormTypeAddToProgram.WAITING:
      console.log('WAITING');
      break;
  }
  return true;
};

export default function ParticipantPrograms() {
  const programs =
    useLoaderData<Prisma.PromiseReturnType<typeof getProgramsByYear>>();
  const [searchParams, setSearchParams] = useSearchParams();

  const modalProgramId = searchParams.get('modalProgramId');

  useEffect(() => {
    // Remove the search params for the modal if modalProgramId is not present in the programs list
    if (
      modalProgramId != null &&
      !programs.map((program) => program.id).includes(+modalProgramId)
    ) {
      setSearchParams({}, { replace: false });
    }
  }, []);

  return (
    <SimpleGrid minChildWidth="300px" spacing="6">
      {programs.map((program) => (
        <ProgramBox
          key={program.id}
          id={program.id}
          name={program.name}
          sex={program.sex}
          ageFrom={program.ageFrom}
          ageTo={program.ageTo}
          seatsAvailable={program.seats}
          seatsTaken={5}
        />
      ))}
    </SimpleGrid>
  );
}
