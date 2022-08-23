import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Table,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import type { UserStatus } from '@prisma/client';
import { Roles } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdEdit } from 'react-icons/md';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { MarkdownEditor } from '~/components/MarkdownEditor/markdown-editor';
import { getLoggedInUser, getUser } from '~/services/users.service';
import { getAge, getFormattedDate, getUserRoleName } from '~/util/utils';

function userStatusHelper(status: UserStatus) {
  switch (status) {
    case 'ACTIVE':
      return {
        label: 'Activo',
        colorScheme: 'blue',
        variant: 'solid',
      };
    case 'INACTIVE':
      return { label: 'Inactivo', colorScheme: 'red', variant: 'solid' };
    case 'INVITED':
      return { label: 'Invitado', colorScheme: 'blue', variant: 'outline' };
    default:
      throw new Error('Unknown user status');
  }
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await getUser(Number(id));
  const loggedinUser = await getLoggedInUser(request);

  const isLoggedinUserAdmin = loggedinUser.isAdmin;

  return json({ user, isLoggedinUserAdmin });
};

export default function UserGeneral() {
  const { user, isLoggedinUserAdmin } = useLoaderData<typeof loader>();

  if (!user) {
    throw new Error("User doesn't exist");
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h3" size="md">
          Datos Personales
        </Heading>
        {isLoggedinUserAdmin && (
          <LinkED to="edit">
            <Button leftIcon={<MdEdit />} colorScheme="blue" size="sm">
              Editar
            </Button>
          </LinkED>
        )}
      </Flex>
      <Divider mt="2" mb="8" />
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={6}
        justifyContent="space-between"
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 0, md: 6 }}
          justifyContent="space-between"
          flex="1"
          order={{ base: 2, lg: 1 }}
        >
          <Table className="general-info-table" variant="simple">
            <Tbody>
              <Tr>
                <Td fontWeight="600">Email:</Td>
                <Td>{user.email}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Rol:</Td>
                <Td>
                  <Stack direction="row" spacing={2}>
                    {user.roles.map((roles) => (
                      <Tag
                        size="sm"
                        key={roles.role}
                        variant={
                          roles.role === Roles.ADMIN ||
                          roles.role === Roles.FACILITATOR
                            ? 'solid'
                            : 'outline'
                        }
                        colorScheme={
                          roles.role === Roles.ADMIN
                            ? 'red'
                            : roles.role === Roles.MENTOR
                            ? 'yellow'
                            : 'brand'
                        }
                      >
                        <TagLabel>{getUserRoleName(roles.role, true)}</TagLabel>
                      </Tag>
                    ))}
                  </Stack>
                </Td>
              </Tr>
              <Tr>
                <Td width="" fontWeight="600">
                  Fecha de nacimiento:
                </Td>
                <Td>
                  {user.birthday &&
                    getFormattedDate({
                      date: user.birthday,
                      timezone: user.timezone,
                    })}
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Edad:</Td>
                <Td>{user.birthday && getAge(user.birthday)}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Teléfono 1:</Td>
                <Td>{user.phone1}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Teléfono 2:</Td>
                <Td>{user.phone2}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Table className="general-info-table" variant="simple">
            <Tbody>
              <Tr>
                <Td fontWeight="600">Dirección:</Td>
                <Td>{user.address}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Ciudad:</Td>
                <Td>{user.city}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Twitter:</Td>
                <Td>{user.twitter}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Facebook:</Td>
                <Td>{user.facebook}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Linkedin:</Td>
                <Td>{user.linkedin}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Skype:</Td>
                <Td>{user.skype}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Stack>
        <Stack
          direction={{ base: 'row', lg: 'column' }}
          spacing="6"
          align="center"
          order={{ base: 1, lg: 2 }}
        >
          <Avatar size="2xl" src={user.picture || undefined} />
          <Box>
            <HStack spacing="5">
              <Tag
                size="lg"
                variant={userStatusHelper(user.status).variant}
                colorScheme={userStatusHelper(user.status).colorScheme}
              >
                {userStatusHelper(user.status).label}
              </Tag>
            </HStack>
          </Box>
        </Stack>
      </Stack>
      <Heading as="h3" size="md" mt={8}>
        Biografía
      </Heading>
      <Divider mt="2" mb="0" />
      {user.biography ? (
        <MarkdownEditor initialContent={user.biography} editable={false} />
      ) : (
        <AlertED
          title="Vacío"
          description="No hay biografía para el usuario."
        />
      )}
    </>
  );
}
