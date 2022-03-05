import { SimpleGrid, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, useLoaderData, useSearchParams } from 'remix';
import { z } from 'zod';

import { CheckboxCard } from '~/components/CheckboxCard';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

import { ProgramBox } from './components/ProgramBox';
import type { Prisma } from '.prisma/client';

export enum FormTypeAddToProgram {
  ACTIVE = 'ACTIVE',
  WAITING = 'WAITING',
}

async function getParticipantProgramsByYear(year: number) {
  return await db.program.findMany({
    where: {
      year: year,
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      participants: {
        select: {
          participantId: true,
          status: true,
          waitingListOrder: true,
        },
      },
    },
  });
}

export type GetParticipantProgramsByYear = Prisma.PromiseReturnType<
  typeof getParticipantProgramsByYear
>;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const selectedYear = url.searchParams.get('year') ?? DateTime.now().year;
  return await getParticipantProgramsByYear(+selectedYear);
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const form = await request.formData();
  const programId = z.string().parse(form.get('programId'));

  switch (form.get('type') as FormTypeAddToProgram) {
    case FormTypeAddToProgram.ACTIVE: {
      return await db.participantsOnPrograms.upsert({
        where: {
          programId_participantId: {
            programId: +programId,
            participantId: +id,
          },
        },
        create: {
          status: 'ACTIVE',
          createdBy: user.id,
          updatedBy: user.id,
          programId: +programId,
          participantId: +id,
        },
        update: {
          status: 'ACTIVE',
          updatedBy: user.id,
        },
      });
    }
    case FormTypeAddToProgram.WAITING: {
      return await db.participantsOnPrograms.upsert({
        where: {
          programId_participantId: {
            programId: +programId,
            participantId: +id,
          },
        },
        create: {
          status: 'WAITING',
          createdBy: user.id,
          updatedBy: user.id,
          programId: +programId,
          participantId: +id,
        },
        update: {
          status: 'WAITING',
          updatedBy: user.id,
        },
      });
    }
    default: {
      throw new Error('Form Type not supported');
    }
  }
};

export default function ParticipantPrograms() {
  const programs = useLoaderData<GetParticipantProgramsByYear>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);

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
      <CheckboxCard
        value="1"
        checkboxProps={{ onChange: (e) => console.log(e) }}
      >
        <Text color="emphasized" fontWeight="medium" fontSize="sm">
          Option
        </Text>
        <Text color="muted" fontSize="sm">
          Jelly biscuit muffin icing dessert powder macaroon.
        </Text>
      </CheckboxCard>
      {programs.map((program) => (
        <ProgramBox program={program} key={program.id} />
      ))}
    </SimpleGrid>
  );
}
