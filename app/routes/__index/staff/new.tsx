import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { Roles } from '@prisma/client';
import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { validationError } from 'remix-validated-form';

import { UserForm, userFormValidator } from '~/components/Users/UsersForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

export const action = async ({ request }: ActionArgs) => {
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

      <Box as="main" py="8" flex="1">
        <Container maxW="8xl">
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p="6"
            rounded="lg"
            shadow="base"
          >
            <UserForm
              defaultValues={{
                status: 'INVITED',
                timezone: 'America/Argentina/Buenos_Aires',
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
