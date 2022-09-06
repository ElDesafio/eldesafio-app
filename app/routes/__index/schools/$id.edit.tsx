import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import * as z from 'zod';

import {
  SchoolForm,
  schoolFormValidator,
} from '~/components/School/SchoolForm';
import { db } from '~/services/db.server';
import { getLoggedInUser } from '~/services/users.service';

// LOADER
export async function loader({ request, params }: LoaderArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const school = await db.school.findUnique({
    where: { id: +id },
  });
  return json({ school });
}

// ACTION
export async function action({ request, params }: ActionArgs) {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await getLoggedInUser(request);

  const fieldValues = await schoolFormValidator.validate(
    Object.fromEntries(await request.formData()),
  );
  if (fieldValues.error) return validationError(fieldValues.error);

  await db.school.update({
    where: { id: +id },
    data: {
      ...fieldValues.data,
      updatedBy: user.id,
    },
  });

  return redirect('/schools');
}

export default function EditParticipant() {
  const { school } = useLoaderData<typeof loader>();
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

      <SchoolForm defaultValues={school ?? undefined} />
    </>
  );
}
