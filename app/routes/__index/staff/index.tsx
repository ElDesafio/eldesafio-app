import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
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
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdAdd } from 'react-icons/md';

import { LinkED } from '~/components/LinkED';
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

export const loader = async () => {
  const users = await getUsers();
  return json({ users });
};

export default function Participants() {
  const { users } = useLoaderData<typeof loader>();

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
            <LinkED to="new">
              <Button leftIcon={<MdAdd />} colorScheme="blue">
                Nuevo
              </Button>
            </LinkED>
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
                          <ChakraLink
                            as={LinkED}
                            to={`${user.id}`}
                            fontWeight="medium"
                          >
                            {user.firstName} {user.lastName}
                          </ChakraLink>
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
                      <LinkED to={`${user.id}/edit`}>
                        <Button variant="link" colorScheme="blue">
                          Edit
                        </Button>
                      </LinkED>
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
