/* eslint-disable sonarjs/no-identical-functions */
import { Divider, Flex, Heading } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { DateTime } from 'luxon';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { z } from 'zod';

import {
  AttendanceForm,
  attendanceFormValidator,
} from '~/components/Attendance/AttendanceForm';
import { authenticator } from '~/services/auth.server';
import { getProgramClasses } from '~/services/classes.service';
import { db } from '~/services/db.server';
import { getProgramParticipants } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';

export async function loader({ request, params }: LoaderArgs) {
  const { id } = z.object({ id: z.string() }).parse(params);

  const classes = await getProgramClasses({
    programId: Number(id),
  });
  if (!classes) {
    throw new Error('Class not found');
  }

  const loggedinUser = await getLoggedInUser(request);

  const participants = await getProgramParticipants({
    programId: Number(id),
    includeStatus: ['ACTIVE'],
  });

  if (!participants) {
    throw new Error('Participants not found');
  }

  const isUserAdmin = loggedinUser.isAdmin;

  return typedjson({
    classes,
    participants,
    isUserAdmin,
  });
}

export async function action({ request, params }: ActionArgs) {
  const { id: programId } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = await request.formData();

  const { data } = await attendanceFormValidator.validate(formData);

  if (!data) {
    throw new Error('There was a problem with the form data');
  }

  await db.class.create({
    data: {
      date: DateTime.fromISO(data.date, { zone: 'utc' }).toJSDate(),
      isRainyDay: data?.isRainyDay,
      programId: Number(programId),
      createdBy: user.id,
      updatedBy: user.id,
      participants: {
        create: data.attendants.map((attendant) => ({
          participantId: Number(attendant.participantId),
          status: attendant.status ?? undefined,
        })),
      },
    },
  });

  return redirect(`/programs/${programId}/attendance`);
}

export default function AttendanceNew() {
  const { participants } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h3" size="md">
          Agregar Estímulo
        </Heading>
      </Flex>
      <Divider mt="2" mb="8" />

      <AttendanceForm attendants={participants} />
    </>
  );
}
