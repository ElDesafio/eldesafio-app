import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { Roles } from '@prisma/client';
import type { ActionFunction } from 'remix';
import { json, redirect } from 'remix';
import { validationError } from 'remix-validated-form';

import { UserForm, userFormValidator } from '~/components/Users/UsersForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

export const action: ActionFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const fieldValues = await userFormValidator.validate(
    Object.fromEntries(await request.formData()),
  );
  if (fieldValues.error) return validationError(fieldValues.error);

  const { roles, ...rest } = fieldValues.data;

  const rolesArrayString = typeof roles === 'string' ? roles.split(',') : [];

  type RolesData = {
    role: Roles;
  };

  const rolesArray: RolesData[] = rolesArrayString.map((role) => ({
    role: role as Roles,
  }));

  const newUser = await db.user.create({
    data: {
      ...rest,
      roles: {
        createMany: {
          data: rolesArray,
          skipDuplicates: true,
        },
      },
    },
  });

  return redirect('/staff');
};

export default function NewParticipant() {
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
            Crear Usuario
          </Heading>
        </Container>
      </Box>

      <UserForm />
    </>
  );
}
