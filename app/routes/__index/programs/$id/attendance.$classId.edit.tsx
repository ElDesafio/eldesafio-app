/* eslint-disable sonarjs/no-identical-functions */
import { Divider, Flex, Heading } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import type { attendanceSchema } from '~/components/Attendance/AttendanceForm';
import {
  AttendanceForm,
  attendanceFormValidator,
} from '~/components/Attendance/AttendanceForm';
import { authenticator } from '~/services/auth.server';
import type { GetClass } from '~/services/classes.service';
import { getClass } from '~/services/classes.service';
import { db } from '~/services/db.server';
import { getLoggedInUser } from '~/services/users.service';
import { isAdmin } from '~/util/utils';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { classId } = z.object({ classId: z.string() }).parse(params);
  let authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const classItem = await getClass(+classId);
  if (!classItem) {
    throw new Error('Classes not found');
  }

  const loggedinUser = await getLoggedInUser(authUser.id);

  if (!loggedinUser) {
    throw new Error('User not found');
  }

  const isUserAdmin = isAdmin(loggedinUser);

  const defaultValues = {
    date: DateTime.fromJSDate(classItem.date).toUTC().toISODate(),
    isRainyDay: classItem.isRainyDay,
    attendants: classItem.attendants.map((attendant) => ({
      participantId: attendant.participantId,
      status: attendant.status,
    })),
  };

  return {
    defaultValues,
    classItem,
    isUserAdmin,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id: programId, classId } = z
    .object({ id: z.string(), classId: z.string() })
    .parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = await request.formData();

  const { data } = attendanceFormValidator.validate(formData);

  if (!data) {
    throw new Error('There was a problem with the form data');
  }

  await db.class.update({
    where: { id: +classId },
    data: {
      date: DateTime.fromISO(data.date, { zone: 'utc' }).toJSDate(),
      isRainyDay: data?.isRainyDay,
      updatedBy: user.id,
    },
  });

  await db.$transaction(async (db) => {
    return await Promise.all([
      db.class.update({
        where: { id: +classId },
        data: {
          date: DateTime.fromISO(data.date, { zone: 'utc' }).toJSDate(),
          isRainyDay: data?.isRainyDay,
          updatedBy: user.id,
        },
      }),
      ...data.attendants.map((attendant) =>
        db.participantsOnClasses.update({
          where: {
            classId_participantId: {
              classId: +classId,
              participantId: +attendant.participantId,
            },
          },
          data: {
            status: attendant.status ?? undefined,
          },
        }),
      ),
    ]);
  });

  return redirect(`/programs/${programId}/attendance`);
};

export default function AttendanceEdit() {
  const { classItem, defaultValues } = useLoaderData<{
    classItem: GetClass;
    defaultValues: Partial<z.infer<typeof attendanceSchema>>;
  }>();

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h3" size="md">
          Editar Estímulo
        </Heading>
      </Flex>
      <Divider mt="2" mb="8" />
      {classItem ? (
        <AttendanceForm
          attendants={classItem?.attendants}
          defaultValues={defaultValues}
        />
      ) : (
        <AlertED
          status="info"
          title="Error"
          description="Es estímulo no se puede editar porque no existe"
        />
      )}
    </>
  );
}
