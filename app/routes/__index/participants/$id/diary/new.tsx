import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import {
  diaryEventFormValidator,
  ParticipantDiaryEventForm,
} from '~/components/Participants/ParticipantDiaryEventForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import type { GetParticipantPrograms } from '~/services/participants.service';
import { getParticipantPrograms } from '~/services/participants.service';

// LOADER
export let loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: zfd.numeric() }).parse(params);

  const programs = await getParticipantPrograms({ participantId: id });

  return { programs };
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const { id: participantId } = z.object({ id: zfd.numeric() }).parse(params);

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await diaryEventFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { programs, ...rest } = fieldValues.data;

  const programsArray =
    typeof programs === 'string'
      ? programs.split(',').map((id) => ({
          programId: Number(id),
        }))
      : [];

  const event = await db.participantDiary.create({
    data: {
      ...rest,
      date: DateTime.fromISO(rest.date, { zone: 'utc' }).toJSDate(),
      participantId,
      createdBy: user.id,
      updatedBy: user.id,
      programs: {
        create: programsArray,
      },
    },
  });

  return redirect(`/participants/${participantId}/diary`);
};

export default function NewProgram() {
  const { programs } = useLoaderData<{
    programs: GetParticipantPrograms;
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
        <ParticipantDiaryEventForm programs={programs} />
      </Box>
    </>
  );
}
