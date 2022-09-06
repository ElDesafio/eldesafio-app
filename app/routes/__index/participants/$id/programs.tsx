import { SimpleGrid, useToast } from '@chakra-ui/react';
import type { ParticipantDiary, Prisma, Sex } from '@prisma/client';
import { ProgramSex } from '@prisma/client';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData, useSearchParams } from '@remix-run/react';
import { DateTime } from 'luxon';
import mudder from 'mudder';
import { useEffect } from 'react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { z } from 'zod';

import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import {
  createParticipantDiaryAutoEvent,
  updateParticipantYearStatus,
} from '~/services/participants.service';
import { getLoggedInUser } from '~/services/users.service';
import { getSelectedYearFromRequest, useSelectedYear } from '~/util/utils';

import { ProgramBox } from './components/ProgramBox';

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
      year,
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

export async function loader({ request, params }: LoaderArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);
  const selectedYear = getSelectedYearFromRequest(request);

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

  const programs = await getParticipantProgramsByYear(
    +selectedYear,
    participant.birthday,
    participant.sex,
  );

  return typedjson({ programs });
}

export async function action({ request, params }: ActionArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const form = await request.formData();
  const programId = z.string().parse(form.get('programId'));

  const program = await db.program.findUnique({
    where: {
      id: +programId,
    },
    select: {
      id: true,
      name: true,
      year: true,
    },
  });

  if (!program) {
    throw new Error("Couldn't get program");
  }

  switch (form.get('type') as FormTypeAddToProgram) {
    case FormTypeAddToProgram.ACTIVE: {
      return await db.$transaction(async (db) => {
        await db.participantsOnPrograms.upsert({
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

        await createParticipantDiaryAutoEvent({
          participantId: +id,
          title: `Dado de alta en el programa`,
          type: 'PROGRAM_STATUS_ACTIVE',
          programId: +programId,
          userId: user.id,
        });

        return await updateParticipantYearStatus({
          participantId: +id,
          programId: +programId,
          year: program?.year,
          userId: user.id,
          type: 'PROGRAM_STATUS_ACTIVE',
        });
      });
    }
    case FormTypeAddToProgram.WAITING: {
      return await db.$transaction(async (db) => {
        // Get the current waiting list for the program
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

        // Create the updated waiting list
        if (waitingList.length > 0) {
          const lastWaitingListString =
            waitingList[waitingList.length - 1].waitingListOrder;
          newWaitingListString = mudder.alphabet.mudder(
            lastWaitingListString!,
            '',
          )[0];
        }

        // Update or create the participant on the program
        await db.participantsOnPrograms.upsert({
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

        // Create the program event
        await createParticipantDiaryAutoEvent({
          participantId: +id,
          title: `Agregado a la lista de espera`,
          type: 'PROGRAM_STATUS_WAITING',
          programId: +programId,
          userId: user.id,
        });

        return await updateParticipantYearStatus({
          participantId: +id,
          programId: +programId,
          year: program?.year,
          userId: user.id,
          type: 'PROGRAM_STATUS_WAITING',
        });
      });
    }
    case FormTypeAddToProgram.REMOVE: {
      return await db.$transaction(async (db) => {
        await db.participantsOnPrograms.update({
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

        await createParticipantDiaryAutoEvent({
          participantId: +id,
          title: `Dado de baja del programa`,
          type: 'PROGRAM_STATUS_INACTIVE_OTHER',
          programId: +programId,
          userId: user.id,
        });

        return await updateParticipantYearStatus({
          participantId: +id,
          programId: +programId,
          year: program?.year,
          userId: user.id,
          type: 'PROGRAM_STATUS_INACTIVE_OTHER',
        });
      });
    }
    default: {
      throw new Error('Form Type not supported');
    }
  }
}

export default function ParticipantPrograms() {
  const { programs } = useTypedLoaderData<typeof loader>();
  const diaryEvent = useActionData<ParticipantDiary | null>();
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();
  let selectedYear = useSelectedYear();

  const modalProgramId = searchParams.get('modalProgramId');

  useEffect(() => {
    // Remove the search params for the modal if modalProgramId is not present in the programs list
    if (
      modalProgramId != null &&
      !programs.map((program) => program.id).includes(+modalProgramId)
    ) {
      searchParams.delete('modalProgramId');
      setSearchParams(searchParams, { replace: true });
    }
  }, []);

  useEffect(() => {
    if (diaryEvent?.type === 'YEAR_STATUS_ACTIVE') {
      toast({
        title: `Cambio de estado en ${selectedYear}`,
        description: 'El estado del participante ha cambiado a ACTIVO',
        status: 'info',

        duration: 5000,
        isClosable: true,
      });
    }
    if (diaryEvent?.type === 'YEAR_STATUS_INACTIVE') {
      toast({
        title: `Cambio de estado en ${selectedYear}`,
        description: 'El estado del participante ha cambiado a INACTIVO',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (diaryEvent?.type === 'YEAR_STATUS_WAITING') {
      toast({
        title: `Cambio de estado en ${selectedYear}`,
        description: 'El estado del participante ha cambiado a EN ESPERA',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [diaryEvent]);

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
