import { SimpleGrid } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import mudder from 'mudder';
import { useEffect } from 'react';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, useLoaderData, useSearchParams } from 'remix';
import { z } from 'zod';

import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

import { ProgramBox } from './components/ProgramBox';
import type { Prisma, Sex } from '.prisma/client';
import { ProgramSex } from '.prisma/client';

export enum FormTypeAddToProgram {
  ACTIVE = 'ACTIVE',
  WAITING = 'WAITING',
  REMOVE = 'REMOVE',
}

async function getParticipantProgramsByYear(
  year: number,
  participantBirthday: string,
  participantSex: Sex,
) {
  const ageAtJune30 = Math.floor(
    DateTime.local(year, 6, 30).diff(
      DateTime.fromISO(participantBirthday),
      'years',
    ).years,
  );
  const ageAtDec31 = Math.floor(
    DateTime.local(year, 12, 31).diff(
      DateTime.fromISO(participantBirthday),
      'years',
    ).years,
  );

  return await db.program.findMany({
    where: {
      year: year,
      AND: [
        {
          OR: [
            {
              sex: ProgramSex.ALL,
            },
            {
              sex: participantSex,
            },
          ],
        },
        {
          OR: [
            {
              AND: [
                { ageFrom: { lte: ageAtDec31 } },
                { ageTo: { gte: ageAtDec31 } },
                { ageByYear: true },
              ],
            },
            {
              AND: [
                { ageFrom: { lte: ageAtJune30 } },
                { ageTo: { gte: ageAtJune30 } },
                { ageByYear: false },
              ],
            },
          ],
        },
      ],
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
          wasEverActive: true,
        },
      },
    },
  });
}

export type GetParticipantProgramsByYear = Prisma.PromiseReturnType<
  typeof getParticipantProgramsByYear
>;

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const selectedYear = url.searchParams.get('year') ?? DateTime.now().year;
  const { id } = z.object({ id: z.string() }).parse(params);

  const participant = await db.participant.findUnique({
    where: {
      id: +id,
    },
    select: {
      id: true,
      birthday: true,
      sex: true,
    },
  });

  if (!participant) {
    throw new Error("Couldn't get participant");
  }

  return await getParticipantProgramsByYear(
    +selectedYear,
    participant.birthday,
    participant.sex,
  );
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
          wasEverActive: true,
          waitingListOrder: null,
          createdBy: user.id,
          updatedBy: user.id,
          programId: +programId,
          participantId: +id,
        },
        update: {
          status: 'ACTIVE',
          wasEverActive: true,
          waitingListOrder: null,
          updatedBy: user.id,
        },
      });
    }
    case FormTypeAddToProgram.WAITING: {
      const waitingList = await db.participantsOnPrograms.findMany({
        where: {
          programId: +programId,
          status: 'WAITING',
          waitingListOrder: {
            not: null,
          },
        },
        orderBy: {
          waitingListOrder: 'asc',
        },
      });

      // Let's start assuming the waiting list is empty.
      let newWaitingListString = mudder.alphabet.mudder()[0];

      if (waitingList.length > 0) {
        const lastWaitingListString =
          waitingList[waitingList.length - 1].waitingListOrder;
        newWaitingListString = mudder.alphabet.mudder(
          lastWaitingListString!,
          '',
        )[0];
      }

      return await db.participantsOnPrograms.upsert({
        where: {
          programId_participantId: {
            programId: +programId,
            participantId: +id,
          },
        },
        create: {
          status: 'WAITING',
          waitingListOrder: newWaitingListString,
          createdBy: user.id,
          updatedBy: user.id,
          programId: +programId,
          participantId: +id,
        },
        update: {
          status: 'WAITING',
          waitingListOrder: newWaitingListString,
          updatedBy: user.id,
        },
      });
    }
    case FormTypeAddToProgram.REMOVE: {
      return await db.participantsOnPrograms.update({
        where: {
          programId_participantId: {
            programId: +programId,
            participantId: +id,
          },
        },
        data: {
          status: 'INACTIVE',
          waitingListOrder: null,
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
    <>
      <SimpleGrid minChildWidth="300px" spacing="6">
        {programs.map((program) => (
          <ProgramBox program={program} key={program.id} />
        ))}
      </SimpleGrid>
    </>
  );
}
