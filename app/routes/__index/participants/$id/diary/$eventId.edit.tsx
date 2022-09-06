import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { DateTime } from 'luxon';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { AlertED } from '~/components/AlertED';
import {
  diaryEventFormValidator,
  ParticipantDiaryEventForm,
} from '~/components/Participants/ParticipantDiaryEventForm';
import { db } from '~/services/db.server';
import {
  getParticipantDiaryEvent,
  getParticipantPrograms,
} from '~/services/participants.service';
import { getLoggedInUser } from '~/services/users.service';

// LOADER
export async function loader({ params, request }: LoaderArgs) {
  const { id, eventId } = z
    .object({ id: zfd.numeric(), eventId: zfd.numeric() })
    .parse(params);

  const user = await getLoggedInUser(request);

  const event = await getParticipantDiaryEvent({ eventId });

  if (!event) {
    throw new Error("The event doesn't exist");
  }

  const eventYear = DateTime.fromJSDate(event.date).year;

  const programs = await getParticipantPrograms({
    participantId: id,
    year: eventYear,
  });

  return json({ programs, event, timezone: user.timezone });
}

// ACTION
export async function action({ request, params }: ActionArgs) {
  const user = await getLoggedInUser(request);
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

  await db.participantDiary.update({
    where: { id: eventId },
    data: {
      ...rest,
      date: DateTime.fromISO(rest.date, { zone: user.timezone }).toJSDate(),
      updatedBy: user.id,
      programs: {
        deleteMany: {},
        create: programsArray,
      },
    },
  });

  return redirect(`/participants/${participantId}/diary`);
}

export default function ParticipantDiaryEventEdit() {
  const { programs, event, timezone } = useLoaderData<typeof loader>();

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
          {event.isAutoEvent && (
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
          isAutoEvent={event.isAutoEvent}
          defaultValues={{
            type: event.type,
            date: DateTime.fromISO(event.date as unknown as string)
              .setZone(timezone)
              .toFormat(`yyyy-MM-dd'T'HH:mm`),
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
