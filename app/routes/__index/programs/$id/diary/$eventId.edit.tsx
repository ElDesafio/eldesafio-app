import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import type { ActionFunction, LoaderFunction } from 'remix';
import { redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { AlertED } from '~/components/AlertED';
import { diaryEventFormValidator } from '~/components/Participants/ParticipantDiaryEventForm';
import {
  ProgramDiaryEventForm,
  programDiaryEventFormValidator,
} from '~/components/Program/ProgramDiaryEventForm';
import { db } from '~/services/db.server';
import type {
  GetProgramDiaryEvent,
  GetProgramParticipants,
} from '~/services/programs.service';
import {
  getProgramDiaryEvent,
  getProgramParticipants,
} from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';

// LOADER
export let loader: LoaderFunction = async ({ params, request }) => {
  const { id, eventId } = z
    .object({ id: zfd.numeric(), eventId: zfd.numeric() })
    .parse(params);

  const user = await getLoggedInUser(request);

  const participants = await getProgramParticipants({
    programId: id,
    includeStatus: ['ACTIVE', 'INACTIVE', 'WAITING'],
  });

  const event = await getProgramDiaryEvent({ eventId });

  return { participants, event, timezone: user.timezone };
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const user = await getLoggedInUser(request);
  const { id: programId, eventId } = z
    .object({ id: zfd.numeric(), eventId: zfd.numeric() })
    .parse(params);

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

  const event = await db.programDiary.update({
    where: { id: eventId },
    data: {
      ...rest,
      date: DateTime.fromISO(rest.date, { zone: user.timezone }).toJSDate(),
      updatedBy: user.id,
      participants: {
        deleteMany: {},
        create: participantsArray,
      },
    },
  });

  return redirect(`/programs/${programId}/diary`);
};

export default function ParticipantDiaryEventEdit() {
  const { participants, event, timezone } = useLoaderData<{
    participants: GetProgramParticipants;
    event: GetProgramDiaryEvent;
    timezone: string;
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
        <ProgramDiaryEventForm
          isAutoEvent={event.isAutoEvent}
          defaultValues={{
            type: event.type,
            date: DateTime.fromISO(event.date as unknown as string)
              .setZone(timezone)
              .toFormat(`yyyy-MM-dd'T'HH:mm`),
            description: event.description ?? undefined,
            title: event.title ?? undefined,
            participants: event.participants
              .map((participant) => participant.participant.id)
              .join(','),
          }}
          participants={participants}
        />
      </Box>
    </>
  );
}
