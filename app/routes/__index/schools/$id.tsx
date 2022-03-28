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
import { useLoaderData } from 'remix';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { MarkdownEditor } from '~/components/MarkdownEditor/markdown-editor';
import type { GetSchool } from '~/services/school.service';
import { getSchool } from '~/services/school.service';
import type { GetUser } from '~/services/users.service';
import { getLoggedInUser, getUser } from '~/services/users.service';
import { getAge, getFormattedDate, getUserRoleName } from '~/util/utils';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const loggedInUser = await getLoggedInUser(request);

  const school = await getSchool(Number(id));

  return { school, isAdmin: loggedInUser.isAdmin };
};

export default function UserGeneral() {
  const { school, isAdmin } =
    useLoaderData<{ school: GetSchool; isAdmin: boolean }>();

  if (!school) {
    throw new Error("School doesn't exist");
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
              {school.name}
            </Heading>
            <Spacer />
            {isAdmin && (
              <LinkED to="edit">
                <Button leftIcon={<MdEdit />} colorScheme="blue">
                  Editar
                </Button>
              </LinkED>
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
                Datos de la escuela
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
                        <Td fontWeight="600">Dirección:</Td>
                        <Td>
                          {school.address}{' '}
                          {school.city ? `(${school.city})` : ``}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Ciudad:</Td>
                        <Td>{school.city}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Correo Electrónico:</Td>
                        <Td>{school.email}</Td>
                      </Tr>
                      <Tr>
                        <Td width="" fontWeight="600">
                          Teléfono:
                        </Td>
                        <Td>{school.phone}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  <Table className="general-info-table" variant="simple">
                    <Tbody>
                      <Tr>
                        <Td fontWeight="600">Director/a:</Td>
                        <Td>{school.principalName}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Teléfono del director/a:</Td>
                        <Td>{school.principalPhone}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Vicedirector/a:</Td>
                        <Td>{school.vicePrincipalName}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Teléfono vicedirector/a:</Td>
                        <Td>{school.vicePrincipalPhone}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Stack>
              </Stack>
            </>
          </Box>
        </Container>
      </Box>
    </>
  );
}
