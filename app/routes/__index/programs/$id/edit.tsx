import type { ActionFunction, LoaderFunction } from 'remix';
import { redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import * as z from 'zod';

import {
  ProgramForm,
  programFormValidator,
} from '~/components/Program/ProgramForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import type { GetProgram } from '~/services/programs.service';
import { getProgram } from '~/services/programs.service';
import type { GetFacilitators, GetVolunteers } from '~/services/users.service';
import { getFacilitators, getVolunteers } from '~/services/users.service';

// LOADER
export let loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const program = await getProgram({ id: Number(id) });

  if (!program) {
    throw new Response('Not Found', {
      status: 404,
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

  return {
    program,
    facilitators,
    volunteers,
    facilitatorsIdsString,
    volunteersIdsString,
  };
};

//ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const fieldValues = await programFormValidator.validate(
    Object.fromEntries(await request.formData()),
  );
  if (fieldValues.error) return validationError(fieldValues.error);

  const { programDays, facilitators, volunteers, ...rest } = fieldValues.data;

  const facilitatorsArray =
    typeof facilitators === 'string'
      ? facilitators.split(',').map((id) => ({
          userId: Number(id),
          isFacilitator: true,
        }))
      : [];
  const volunteersArray =
    typeof volunteers === 'string'
      ? volunteers.split(',').map((id) => ({
          userId: Number(id),
          isFacilitator: false,
        }))
      : [];

  const program = await db.program.update({
    where: { id: +id },
    data: {
      ...rest,
      programDays: {
        deleteMany: {},
        create: programDays,
      },
      educators: {
        deleteMany: {},
        create: [...facilitatorsArray, ...volunteersArray],
      },
    },
  });

  return redirect(`/programs/${id}`);
};

export default function EditProgram() {
  const {
    program,
    facilitators,
    volunteers,
    facilitatorsIdsString,
    volunteersIdsString,
  } = useLoaderData<{
    program: Exclude<GetProgram, 'participants'>;
    facilitators: GetFacilitators;
    volunteers: GetVolunteers;
    facilitatorsIdsString: string;
    volunteersIdsString: string;
  }>();

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
