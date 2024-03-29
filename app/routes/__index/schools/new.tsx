import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { validationError } from 'remix-validated-form';

import {
  SchoolForm,
  schoolFormValidator,
} from '~/components/School/SchoolForm';
import { db } from '~/services/db.server';
import { getLoggedInUser } from '~/services/users.service';

export async function action({ request }: ActionArgs) {
  let user = await getLoggedInUser(request);

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await schoolFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  await db.school.create({
    data: {
      ...fieldValues.data,
      createdBy: user.id,
      updatedBy: user.id,
    },
  });

  return redirect('/schools');
}

export default function NewProgram() {
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
            Crear Escuela
          </Heading>
        </Container>
      </Box>

      <SchoolForm />
    </>
  );
}
