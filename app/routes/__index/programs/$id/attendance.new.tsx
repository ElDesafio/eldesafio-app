/* eslint-disable sonarjs/no-identical-functions */
import { Divider, Flex, Heading } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { z } from 'zod';

import {
  AttendanceForm,
  attendanceFormValidator,
} from '~/components/Attendance/AttendanceForm';
import { authenticator } from '~/services/auth.server';
import { getProgramClasses } from '~/services/classes.service';
import { db } from '~/services/db.server';
import type { GetProgramParticipants } from '~/services/programs.service';
import { getProgramParticipants } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';
import { isAdmin } from '~/util/utils';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);
  let authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const classes = await getProgramClasses({
    programId: Number(id),
  });
  if (!classes) {
    throw new Error('Class not found');
  }

  const loggedinUser = await getLoggedInUser(authUser.id);

  if (!loggedinUser) {
    throw new Error('User not found');
  }

  const participants = await getProgramParticipants({
    programId: Number(id),
    includeStatus: ['ACTIVE'],
  });

  if (!participants) {
    throw new Error('Participants not found');
  }

  const isUserAdmin = isAdmin(loggedinUser);

  return {
    classes,
    participants,
    isUserAdmin,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id: programId } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = await request.formData();

  const { data } = attendanceFormValidator.validate(formData);

  if (!data) {
    throw new Error('There was a problem with the form data');
  }

  console.log(DateTime.fromISO(data.date, { zone: 'utc' }).toJSDate());

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
};

export default function ProgramGeneral() {
  const { participants } = useLoaderData<{
    participants: GetProgramParticipants;
  }>();

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
