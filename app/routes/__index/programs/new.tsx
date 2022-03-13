import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';

import {
  ProgramForm,
  programFormValidator,
} from '~/components/Program/ProgramForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import type { GetFacilitators, GetVolunteers } from '~/services/users.service';
import { getFacilitators, getVolunteers } from '~/services/users.service';

// LOADER
export let loader: LoaderFunction = async () => {
  const facilitators = await getFacilitators({});
  const volunteers = await getVolunteers({});

  return { facilitators, volunteers };
};

// ACTION
export const action: ActionFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = programFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { programDays, ...rest } = fieldValues.data;

  const program = await db.program.create({
    data: {
      ...rest,
      createdBy: user.id,
      updatedBy: user.id,
      programDays: {
        create: programDays,
      },
    },
  });

  return redirect('/programs');
};

export default function NewProgram() {
  const { facilitators, volunteers } = useLoaderData<{
    facilitators: GetFacilitators;
    volunteers: GetVolunteers;
  }>();

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
            Crear Programa
          </Heading>
        </Container>
      </Box>
      <Box as="main" py="8" flex="1">
        <Container maxW="8xl" id="xxx">
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p="6"
            rounded="lg"
            shadow="base"
          >
            <ProgramForm facilitators={facilitators} volunteers={volunteers} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
