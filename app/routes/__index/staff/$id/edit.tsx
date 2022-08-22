import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { Prisma, Roles, User } from '@prisma/client';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { validationError } from 'remix-validated-form';
import type { Socket } from 'socket.io-client';
import * as z from 'zod';

import { UserForm, userFormValidator } from '~/components/Users/UsersForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

async function getUser(id: number) {
  return await db.user.findUnique({
    where: { id },
    include: { roles: true },
  });
}

// LOADER
export const loader = async ({ params }: LoaderArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await getUser(+id);

  return typedjson(user);
};

// ACTION
export const action = async ({ request, params, context }: ActionArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await userFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { roles, ...rest } = fieldValues.data;

  const rolesArrayString = typeof roles === 'string' ? roles.split(',') : [];

  type RolesData = {
    role: Roles;
  };

  const rolesArray: RolesData[] = rolesArrayString.map((role) => ({
    role: role as Roles,
  }));

  const updatedUser = await db.user.update({
    where: { id: +id },
    data: {
      ...rest,
      roles: {
        deleteMany: {},
        createMany: {
          data: rolesArray,
          skipDuplicates: true,
        },
      },
    },
  });

  if (updatedUser.status === 'INACTIVE' && context) {
    (context.socket as Socket).emit('user-deactivated', {
      userId: updatedUser.id,
    });
  }

  return redirect(`/staff/${id}`);
};

type UserWithRoles = User & {
  roles: string;
};

export default function EditParticipant() {
  const user = useTypedLoaderData<typeof loader>();

  if (!user) return <p>No existe el usuario</p>;

  let userWithRoles: UserWithRoles = {
    ...user,
    roles: user.roles.map((role) => role.role).join(','),
  };

  return <UserForm defaultValues={userWithRoles} />;
}
