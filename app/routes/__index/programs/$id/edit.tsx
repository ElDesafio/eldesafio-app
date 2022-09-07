import { UserDiaryType } from '@prisma/client';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { DateTime } from 'luxon';
import { validationError } from 'remix-validated-form';
import * as z from 'zod';

import {
  ProgramForm,
  programFormValidator,
} from '~/components/Program/ProgramForm';
import { db } from '~/services/db.server';
import { getProgram } from '~/services/programs.service';
import {
  getFacilitators,
  getLoggedInUser,
  getVolunteers,
} from '~/services/users.service';

// LOADER
export async function loader({ request, params }: LoaderArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const program = await getProgram({ id: Number(id) });

  if (!program) {
    throw new Response('El programa no existe', {
      status: 404,
      statusText: 'El programa no existe',
    });
  }

  const facilitators = await getFacilitators({});
  const volunteers = await getVolunteers({});

  const facilitatorsIds = program.educators
    .filter((educator) => educator && educator.isFacilitator)
    .map((educator) => educator.userId);
  const volunteersIds = program.educators
    .filter((educator) => educator && !educator.isFacilitator)
    .map((educator) => educator.userId);

  //These are used for the default value of the form
  const facilitatorsIdsString = facilitatorsIds.join(',');
  const volunteersIdsString = volunteersIds.join(',');

  return json({
    program,
    facilitators,
    volunteers,
    facilitatorsIdsString,
    volunteersIdsString,
  });
}

//ACTION
export async function action({ request, params }: ActionArgs) {
  let user = await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const fieldValues = await programFormValidator.validate(
    Object.fromEntries(await request.formData()),
  );
  if (fieldValues.error) return validationError(fieldValues.error);

  const { programDays, facilitators, volunteers, ...rest } = fieldValues.data;

  const newFacilitators =
    typeof facilitators === 'string'
      ? facilitators.split(',').map((id) => ({
          userId: Number(id),
          isFacilitator: true,
        }))
      : [];
  const newVolunteers =
    typeof volunteers === 'string'
      ? volunteers.split(',').map((id) => ({
          userId: Number(id),
          isFacilitator: false,
        }))
      : [];

  await db.$transaction(async (db) => {
    const program = await db.program.findUnique({
      where: {
        id: +id,
      },
      include: {
        educators: {
          select: {
            userId: true,
            isFacilitator: true,
          },
        },
      },
    });

    if (!program) {
      throw new Response('Not Found', {
        status: 404,
      });
    }

    const currentFacilitators = program.educators.filter(
      (educator) => educator && educator.isFacilitator,
    );
    const currentVolunteers = program.educators.filter(
      (educator) => educator && !educator.isFacilitator,
    );

    const newActiveFacilitators = newFacilitators.filter(
      (facilitator) =>
        !currentFacilitators.some(
          ({ userId }) => userId === facilitator.userId,
        ),
    );

    const newActiveVolunteers = newVolunteers.filter(
      (volunteer) =>
        !currentVolunteers.some(({ userId }) => userId === volunteer.userId),
    );

    const newInactiveFacilitators = currentFacilitators.filter(
      (facilitator) =>
        !newFacilitators.some(({ userId }) => userId === facilitator.userId),
    );

    const newInactiveVolunteers = currentVolunteers.filter(
      (volunteer) =>
        !newVolunteers.some(({ userId }) => userId === volunteer.userId),
    );

    newActiveFacilitators.forEach(async (facilitator) => {
      await db.userDiary.create({
        data: {
          userId: facilitator.userId,
          type: UserDiaryType.PROGRAM_STATUS_ACTIVE,
          isAutoEvent: true,
          title: `Dado de alta como facilitador en el programa`,
          date: DateTime.utc().toJSDate(),
          createdBy: user.id,
          updatedBy: user.id,
          programs: {
            create: {
              programId: program.id,
            },
          },
        },
      });
    });
    newInactiveFacilitators.forEach(async (facilitator) => {
      await db.userDiary.create({
        data: {
          userId: facilitator.userId,
          type: UserDiaryType.PROGRAM_STATUS_INACTIVE,
          isAutoEvent: true,
          title: `Dado de baja como facilitador en el programa`,
          date: DateTime.utc().toJSDate(),
          createdBy: user.id,
          updatedBy: user.id,
          programs: {
            create: {
              programId: program.id,
            },
          },
        },
      });
    });
    newActiveVolunteers.forEach(async (volunteer) => {
      await db.userDiary.create({
        data: {
          userId: volunteer.userId,
          type: UserDiaryType.PROGRAM_STATUS_ACTIVE,
          isAutoEvent: true,
          title: `Dado de alta como voluntario en el programa`,
          date: DateTime.utc().toJSDate(),
          createdBy: user.id,
          updatedBy: user.id,
          programs: {
            create: {
              programId: program.id,
            },
          },
        },
      });
    });
    newInactiveVolunteers.forEach(async (volunteer) => {
      await db.userDiary.create({
        data: {
          userId: volunteer.userId,
          type: UserDiaryType.PROGRAM_STATUS_INACTIVE,
          isAutoEvent: true,
          title: `Dado de baja como voluntario en el programa`,
          date: DateTime.utc().toJSDate(),
          createdBy: user.id,
          updatedBy: user.id,
          programs: {
            create: {
              programId: program.id,
            },
          },
        },
      });
    });

    await db.program.update({
      where: { id: +id },
      data: {
        ...rest,
        programDays: {
          deleteMany: {},
          create: programDays,
        },
        educators: {
          deleteMany: {},
          create: [...newFacilitators, ...newVolunteers],
        },
      },
    });
  });

  return redirect(`/programs/${id}`);
}

export default function EditProgram() {
  const {
    program,
    facilitators,
    volunteers,
    facilitatorsIdsString,
    volunteersIdsString,
  } = useLoaderData<typeof loader>();

  if (!program) {
    throw new Error('Program not found');
  }

  return (
    <ProgramForm
      defaultValues={{
        ...program,
        facilitators: facilitatorsIdsString,
        volunteers: volunteersIdsString,
      }}
      facilitators={facilitators}
      volunteers={volunteers}
    />
  );
}
