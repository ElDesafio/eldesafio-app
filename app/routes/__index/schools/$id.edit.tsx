import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import * as z from 'zod';

import {
  SchoolForm,
  schoolFormValidator,
} from '~/components/School/SchoolForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

import type { School } from '.prisma/client';

// LOADER
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const school: School | null = await db.school.findUnique({
    where: { id: +id },
  });
  return school;
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const fieldValues = await schoolFormValidator.validate(
    Object.fromEntries(await request.formData()),
  );
  if (fieldValues.error) return validationError(fieldValues.error);

  const school = await db.school.update({
    where: { id: +id },
    data: {
      ...fieldValues.data,
      updatedBy: user.id,
    },
  });

  return redirect('/schools');
};

export default function EditParticipant() {
  const school = useLoaderData<School>();
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
            Editar Escuela
          </Heading>
        </Container>
      </Box>

      <SchoolForm defaultValues={school} />
    </>
  );
}
