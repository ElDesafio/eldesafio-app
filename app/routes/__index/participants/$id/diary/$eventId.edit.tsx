import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { AlertED } from '~/components/AlertED';
import {
  diaryEventFormValidator,
  ParticipantDiaryEventForm,
} from '~/components/Participants/ParticipantDiaryEventForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import type {
  GetParticipantDiaryEvent,
  GetParticipantPrograms,
} from '~/services/participants.service';
import {
  getParticipantDiaryEvent,
  getParticipantPrograms,
} from '~/services/participants.service';

// LOADER
export let loader: LoaderFunction = async ({ params }) => {
  const { id, eventId } = z
    .object({ id: zfd.numeric(), eventId: zfd.numeric() })
    .parse(params);

  const programs = await getParticipantPrograms({ participantId: id });

  const event = await getParticipantDiaryEvent({ eventId });

  const isAutoEvent = event?.type !== 'INFO' && event?.type !== 'MENTORSHIP';

  return { programs, event, isAutoEvent };
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const { id: participantId, eventId } = z
    .object({ id: zfd.numeric(), eventId: zfd.numeric() })
    .parse(params);

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

  const event = await db.participantDiary.update({
    where: { id: eventId },
    data: {
      ...rest,
      date: DateTime.fromISO(rest.date, { zone: 'utc' }).toJSDate(),
      updatedBy: user.id,
      programs: {
        deleteMany: {},
        create: programsArray,
      },
    },
  });

  return redirect(`/participants/${participantId}/diary`);
};

export default function ParticipantDiaryEventEdit() {
  const { programs, event, isAutoEvent } = useLoaderData<{
    programs: GetParticipantPrograms;
    event: GetParticipantDiaryEvent;
    isAutoEvent: boolean;
  }>();

  if (!event) throw new Error("Event doesn't exist");

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
            Editar Evento
          </Heading>
          {isAutoEvent && (
            <AlertED
              small
              description="Solo se puede editar la descripción porque es un evento automático"
              my={4}
            />
          )}
        </Container>
      </Box>
      <Box as="main" py="0" flex="1">
        <ParticipantDiaryEventForm
          isAutoEvent={isAutoEvent}
          defaultValues={{
            type: event.type,
            date: DateTime.fromISO(event.date as unknown as string)
              .toUTC()
              .toISODate(),
            description: event.description ?? undefined,
            title: event.title ?? undefined,
            programs: event.programs
              .map((program) => program.program.id)
              .join(','),
          }}
          programs={programs}
        />
      </Box>
    </>
  );
}
