import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import type { ActionFunction, LoaderFunction } from 'remix';
import { redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import {
  ProgramDiaryEventForm,
  programDiaryEventFormValidator,
} from '~/components/Program/ProgramDiaryEventForm';
import { db } from '~/services/db.server';
import type { GetProgramParticipants } from '~/services/programs.service';
import { getProgramParticipants } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';

// LOADER
export let loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: zfd.numeric() }).parse(params);

  const participants = await getProgramParticipants({
    programId: id,
    includeStatus: ['ACTIVE', 'INACTIVE', 'WAITING'],
  });

  return { participants };
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const user = await getLoggedInUser(request);

  const { id: programId } = z.object({ id: zfd.numeric() }).parse(params);

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await programDiaryEventFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { participants, ...rest } = fieldValues.data;

  const participantsArray =
    typeof participants === 'string'
      ? participants.split(',').map((id) => ({
          participantId: Number(id),
        }))
      : [];

  const event = await db.programDiary.create({
    data: {
      ...rest,
      date: DateTime.fromISO(rest.date, { zone: user.timezone }).toJSDate(),
      programId,
      createdBy: user.id,
      updatedBy: user.id,
      participants: {
        create: participantsArray,
      },
    },
  });

  return redirect(`/programs/${programId}/diary`);
};

export default function NewProgram() {
  const { participants } = useLoaderData<{
    participants: GetProgramParticipants;
  }>();

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="0"
        pb="4"
        shadow="sm"
      >
        <Container maxW="8xl">
          <Heading size="md" mb="0">
            Crear Evento
          </Heading>
        </Container>
      </Box>
      <Box as="main" py="0" flex="1">
        <ProgramDiaryEventForm participants={participants} />
      </Box>
    </>
  );
}
