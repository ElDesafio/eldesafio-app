import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Table,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import type { UserStatus } from '@prisma/client';
import { Roles } from '@prisma/client';
import { MdEdit } from 'react-icons/md';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
import { z } from 'zod';

import { MarkdownEditor } from '~/components/MarkdownEditor/markdown-editor';
import { authenticator } from '~/services/auth.server';
import type { GetUser } from '~/services/users.service';
import { getLoggedInUser, getUser } from '~/services/users.service';
import {
  getAge,
  getFormattedDate,
  getUserRoleName,
  isAdmin,
} from '~/util/utils';

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

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);
  let authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const user = await getUser(Number(id));
  const loggedinUser = await getLoggedInUser(authUser.id);

  if (!loggedinUser) {
    throw new Error('User not found');
  }

  const isLoggedinUserAdmin = isAdmin(loggedinUser);

  return { user, isLoggedinUserAdmin };
};

export default function UserGeneral() {
  const { user, isLoggedinUserAdmin } =
    useLoaderData<{ user: GetUser; isLoggedinUserAdmin: boolean }>();

  if (!user) {
    throw new Error("User doesn't exist");
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
          <Flex>
            <Heading size="lg" mb="0">
              {user.firstName} {user.lastName}
            </Heading>
            <Spacer />
            {isLoggedinUserAdmin && (
              <Link to="edit">
                <Button leftIcon={<MdEdit />} colorScheme="blue">
                  Editar
                </Button>
              </Link>
            )}
          </Flex>
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
            <>
              <Heading as="h3" size="md">
                Datos Personales
              </Heading>
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
                                <TagLabel>
                                  {getUserRoleName(roles.role, true)}
                                </TagLabel>
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
                          {user.birthday && getFormattedDate(user.birthday)}
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
              {user.biography && (
                <MarkdownEditor
                  initialContent={user.biography}
                  editable={false}
                />
              )}
            </>
          </Box>
        </Container>
      </Box>
    </>
  );
}
