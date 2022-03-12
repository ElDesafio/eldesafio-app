import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
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

  const facilitators = await getFacilitators({});
  const volunteers = await getVolunteers({});

  return { program, facilitators, volunteers };
};

//ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const fieldValues = programFormValidator.validate(
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
  const { program, facilitators, volunteers } = useLoaderData<{
    program: Exclude<GetProgram, 'participants'>;
    facilitators: GetFacilitators;
    volunteers: GetVolunteers;
  }>();

  if (!program) {
    throw new Error('Program not found');
  }

  let facilitatorsIds = '';
  let volunteersIds = '';

  if (program.educators) {
    facilitatorsIds = program.educators
      .filter((educator) => educator && educator.isFacilitator)
      .map((educator) => educator.userId)
      .join(',');
    volunteersIds = program.educators
      .filter((educator) => educator && !educator.isFacilitator)
      .map((educator) => educator.userId)
      .join(',');
  }

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="8xl">
          <Heading size="lg" mb="0">
            Editar Programa
          </Heading>
        </Container>
      </Box>

      <ProgramForm
        defaultValues={{
          ...program,
          facilitators: facilitatorsIds,
          volunteers: volunteersIds,
        }}
        facilitators={facilitators}
        volunteers={volunteers}
      />
    </>
  );
}
