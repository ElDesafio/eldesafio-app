import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Table,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import type { Prisma } from '@prisma/client';
import { Roles } from '@prisma/client';
import { MdAdd } from 'react-icons/md';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';

import { db } from '~/services/db.server';
import { getUserRoleName } from '~/util/utils';

async function getUsers() {
  return await db.user.findMany({
    orderBy: { firstName: 'asc' },
    include: {
      roles: true,
    },
  });
}

type GetUsers = Prisma.PromiseReturnType<typeof getUsers>;

export const loader: LoaderFunction = async () => {
  return await getUsers();
};

export default function Participants() {
  const users = useLoaderData<GetUsers>();
  console.log(users);
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
              Staff
            </Heading>
            <Spacer />
            <Link to="new">
              <Button leftIcon={<MdAdd />} colorScheme="blue">
                Nuevo
              </Button>
            </Link>
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
            overflowX="auto"
          >
            <Table borderWidth="1px" fontSize="sm">
              <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
                <Tr>
                  <Th whiteSpace="nowrap" scope="col">
                    USUARIO
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    ROL
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    TELEFONO 1
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    TELEFONO 2
                  </Th>
                  <Th whiteSpace="nowrap" scope="col" />
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td whiteSpace="nowrap">
                      <Stack direction="row" spacing="4" align="center">
                        <Box flexShrink={0}>
                          <Avatar size="md" src={user.picture || undefined} />
                        </Box>
                        <Box>
                          <Box fontSize="sm" fontWeight="medium">
                            <Link to={`/participants/${user.id}`}>
                              {user.firstName} {user.lastName}
                            </Link>
                          </Box>
                          <Box fontSize="sm" color="gray.500">
                            {user.email}
                          </Box>
                        </Box>
                      </Stack>
                    </Td>
                    <Td>
                      <Stack direction="row" spacing="2">
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
                    <Td>{user.phone1}</Td>
                    <Td>{user.phone2}</Td>
                    <Td textAlign="right">
                      <Link to={`${user.id}/edit`}>
                        <Button variant="link" colorScheme="blue">
                          Edit
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Container>
      </Box>
    </>
  );
}
