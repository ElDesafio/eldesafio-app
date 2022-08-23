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
  UserDiaryEventForm,
  userDiaryEventFormValidator,
} from '~/components/Users/UserDiaryEventForm';
import { db } from '~/services/db.server';
import {
  getLoggedInUser,
  getUserDiaryEvent,
  getUserPrograms,
} from '~/services/users.service';

// LOADER
export let loader = async ({ params, request }: LoaderArgs) => {
  const { id, eventId } = z
    .object({ id: zfd.numeric(), eventId: zfd.numeric() })
    .parse(params);

  const user = await getLoggedInUser(request);

  const event = await getUserDiaryEvent({ eventId });

  if (!event) {
    throw new Error("The event doesn't exist");
  }

  const eventYear = DateTime.fromJSDate(event.date).year;

  const programs = await getUserPrograms({ userId: id, year: eventYear });

  return json({ programs, event, timezone: user.timezone });
};

// ACTION
export const action = async ({ request, params }: ActionArgs) => {
  const user = await getLoggedInUser(request);
  const { id: userId, eventId } = z
    .object({ id: zfd.numeric(), eventId: zfd.numeric() })
    .parse(params);

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await userDiaryEventFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { programs, ...rest } = fieldValues.data;

  const programsArray =
    typeof programs === 'string'
      ? programs.split(',').map((id) => ({
          programId: Number(id),
        }))
      : [];

  const event = await db.userDiary.update({
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

  return redirect(`/staff/${userId}/diary`);
};

export default function UserDiaryEventEdit() {
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
        <UserDiaryEventForm
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
