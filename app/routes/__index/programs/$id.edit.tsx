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

import type { Program } from '.prisma/client';

// LOADER
export let loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const program: Program | null = await db.program.findUnique({
    where: { id: +id },
    include: { programDays: { orderBy: { day: 'asc' } } },
  });
  return program;
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

  const { programDays, ...rest } = fieldValues.data;

  const program = await db.program.update({
    where: { id: +id },
    data: {
      ...rest,
      programDays: {
        deleteMany: {},
        create: programDays,
      },
    },
  });

  return redirect('/programs');
};

export default function EditParticipant() {
  const program = useLoaderData<Program>();
  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="7xl">
          <Heading size="lg" mb="0">
            Editar Programa
          </Heading>
        </Container>
      </Box>

      <ProgramForm defaultValues={program} />
    </>
  );
}
