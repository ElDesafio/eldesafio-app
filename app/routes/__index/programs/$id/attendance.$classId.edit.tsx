/* eslint-disable sonarjs/no-identical-functions */
import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { DateTime } from 'luxon';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import {
  AttendanceForm,
  attendanceFormValidator,
} from '~/components/Attendance/AttendanceForm';
import { getClass } from '~/services/classes.service';
import { db } from '~/services/db.server';
import { getLoggedInUser } from '~/services/users.service';

export async function loader({ request, params }: LoaderArgs) {
  const loggedinUser = await getLoggedInUser(request);

  const { classId } = z.object({ classId: z.string() }).parse(params);

  const classItem = await getClass(+classId);
  if (!classItem) {
    throw new Error('Classes not found');
  }

  const isUserAdmin = loggedinUser.isAdmin;

  const defaultValues = {
    date: DateTime.fromJSDate(classItem.date).toUTC().toISODate(),
    isRainyDay: classItem.isRainyDay,
    attendants: classItem.attendants.map((attendant) => ({
      participantId: attendant.participantId,
      status: attendant.status,
    })),
  };

  return json({
    defaultValues,
    classItem,
    isUserAdmin,
  });
}

export async function action({ request, params }: ActionArgs) {
  const user = await getLoggedInUser(request);

  const { id: programId, classId } = z
    .object({ id: z.string(), classId: z.string() })
    .parse(params);

  const url = new URL(request.url);

  const formData = await request.formData();

  // Check if it's a delete request
  if (formData.get('type') === `DELETE_CLASS`) {
    await db.class.delete({
      where: {
        id: +classId,
      },
    });

    return redirect(
      `/programs/${programId}/attendance?${url.searchParams.toString()}`,
    );
  }

  if (!user) throw json('Unauthorized', { status: 403 });

  const { data } = await attendanceFormValidator.validate(formData);

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

  return redirect(
    `/programs/${programId}/attendance?${url.searchParams.toString()}`,
  );
}

export default function AttendanceEdit() {
  const { classItem, defaultValues } = useLoaderData<typeof loader>();

  const transition = useTransition();

  const isDeleting =
    transition.state === 'submitting' &&
    transition.submission?.formData.get('type') === `DELETE_CLASS`;

  if (!classItem) {
    throw new Error("Class doesn't exist");
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <HStack flex={1} display="flex" justifyContent="space-between">
          <Heading as="h3" size="md">
            Editar Estímulo
          </Heading>
          <Popover
            returnFocusOnClose={false}
            placement="left"
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <Button colorScheme="red" isLoading={isDeleting}>
                Borrar
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">Confirmación</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                ¿Estás seguro que querés borrar la clase? Una vez borrada no se
                puede recuperar.
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Form method="post">
                    <input name="type" type="hidden" value="DELETE_CLASS" />
                    <input
                      name="participantId"
                      type="hidden"
                      value={classItem?.id}
                    />
                    <Button
                      type="submit"
                      colorScheme="red"
                      isLoading={isDeleting}
                    >
                      Borrar
                    </Button>
                  </Form>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </HStack>
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
