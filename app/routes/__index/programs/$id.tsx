import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
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
import { css } from '@emotion/react';
import { MdEdit } from 'react-icons/md';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
import { z } from 'zod';

import { authenticator } from '~/services/auth.server';
import type { GetProgram } from '~/services/programs.service';
import { getProgram } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';
import { getDayByName, isAdmin, ProgramSexText } from '~/util/utils';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);
  let authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const program = await getProgram({ id: Number(id) });
  const loggedinUser = await getLoggedInUser(authUser.id);

  if (!loggedinUser) {
    throw new Error('User not found');
  }

  const isUserAdmin = isAdmin(loggedinUser);

  return { program, isUserAdmin };
};

export default function ProgramGeneral() {
  const { program, isUserAdmin } =
    useLoaderData<{ program: GetProgram; isUserAdmin: boolean }>();

  if (!program) {
    throw new Error("Program doesn't exist");
  }

  const facilitators = program.educators.filter(
    (educator) => educator.isFacilitator,
  );
  const volunteers = program.educators.filter(
    (educator) => !educator.isFacilitator,
  );

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
              {program.name}
            </Heading>
            <Spacer />
            {isUserAdmin && (
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
                Datos
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
                  <Table
                    className="general-info-table"
                    variant="simple"
                    css={css`
                      td {
                        padding: 0.5rem 0.5rem 0.5rem 0 !important;
                      }
                    `}
                  >
                    <Tbody>
                      <Tr>
                        <Td fontWeight="600">Facilitador(es):</Td>
                        <Td>
                          <Stack direction="row" spacing="2">
                            {facilitators.map((facilitator) => (
                              <Tag
                                size="md"
                                key={facilitator.userId}
                                variant="solid"
                                colorScheme="brand"
                              >
                                <TagLabel>
                                  {facilitator.user.firstName}{' '}
                                  {facilitator.user.lastName}
                                </TagLabel>
                              </Tag>
                            ))}
                          </Stack>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Voluntario(s):</Td>
                        <Td>
                          <Stack direction="row" spacing="2">
                            {volunteers.map((volunteer) => (
                              <Tag
                                size="md"
                                key={volunteer.userId}
                                variant="outline"
                                colorScheme="brand"
                              >
                                <TagLabel>
                                  {volunteer.user.firstName}{' '}
                                  {volunteer.user.lastName}
                                </TagLabel>
                              </Tag>
                            ))}
                          </Stack>
                        </Td>
                      </Tr>

                      <Tr>
                        <Td fontWeight="600">Cupo:</Td>
                        <Td>{program.seats}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Edad:</Td>
                        <Td>
                          {program.ageFrom} a {program.ageTo} años
                        </Td>
                      </Tr>
                      <Tr>
                        <Td width="" fontWeight="600">
                          Sexo:
                        </Td>
                        <Td>{ProgramSexText[program.sex]}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Día y hora:</Td>
                        <Td>
                          {program.programDays.map((day) => (
                            <div key={day.id}>
                              <span>
                                {getDayByName(day.day)} de {day.fromTime} a{' '}
                                {day.toTime}
                              </span>
                              <br />
                            </div>
                          ))}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="600">Año:</Td>
                        <Td>{program.year}</Td>
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
                  Acá va el chart
                </Stack>
              </Stack>
              <Heading as="h3" size="md" mt={8}>
                Participantes
              </Heading>
              <Divider mt="2" mb="8" />
            </>
          </Box>
        </Container>
      </Box>
    </>
  );
}
