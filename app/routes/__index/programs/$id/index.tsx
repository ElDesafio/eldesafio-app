/* eslint-disable sonarjs/no-identical-functions */
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  Spacer,
  Stack,
  Table,
  TableCaption,
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

import { AlertED } from '~/components/AlertED';
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

  const program = await getProgram({
    id: Number(id),
    includeParticipants: true,
  });
  const loggedinUser = await getLoggedInUser(authUser.id);

  if (!loggedinUser) {
    throw new Error('User not found');
  }
  if (!program) {
    throw new Error('Program not found');
  }

  const facilitators = program.educators.filter(
    (educator) => educator.isFacilitator,
  );
  const volunteers = program.educators.filter(
    (educator) => !educator.isFacilitator,
  );

  const participantsActive = program.participants.filter(
    (participant) => participant.status === 'ACTIVE',
  );
  const participantsInactive = program.participants.filter(
    (participant) => participant.status === 'INACTIVE',
  );
  const participantsWaiting = program.participants.filter(
    (participant) => participant.status === 'WAITING',
  );

  const isUserAdmin = isAdmin(loggedinUser);

  return {
    program,
    isUserAdmin,
    facilitators,
    volunteers,
    participantsActive,
    participantsInactive,
    participantsWaiting,
  };
};

export default function ProgramGeneral() {
  const {
    program,
    isUserAdmin,
    facilitators,
    volunteers,
    participantsActive,
    participantsInactive,
    participantsWaiting,
  } = useLoaderData<{
    program: GetProgram;
    isUserAdmin: boolean;
    facilitators: Exclude<GetProgram, null>['educators'];
    volunteers: Exclude<GetProgram, null>['educators'];
    participantsActive: Exclude<GetProgram, null>['participants'];
    participantsInactive: Exclude<GetProgram, null>['participants'];
    participantsWaiting: Exclude<GetProgram, null>['participants'];
  }>();

  if (!program) {
    throw new Error("Program doesn't exist");
  }

  return (
    <>
      <Flex alignItems="center">
        <Heading as="h3" size="md">
          Datos Generales
        </Heading>
        <Spacer />
        {isUserAdmin && (
          <Link to="edit">
            <Button size="sm" leftIcon={<MdEdit />} colorScheme="blue">
              Editar
            </Button>
          </Link>
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
                          {volunteer.user.firstName} {volunteer.user.lastName}
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
                        {getDayByName(day.day)} de {day.fromTime} a {day.toTime}{' '}
                        hs
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
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={6}
        justifyContent="space-between"
      >
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          p="6"
          rounded="lg"
          shadow="base"
          flex={1}
        >
          <Heading as="h4" size="sm" textAlign="center" mb={4}>
            Activos
          </Heading>
          {participantsActive.length > 0 ? (
            <Table size="sm">
              <TableCaption>Total: {participantsActive.length}</TableCaption>
              <Tbody>
                {participantsActive.map((participant) => (
                  <Tr key={participant.participantId}>
                    <Td>
                      <ChakraLink
                        as={Link}
                        to={`/participants/${participant.participantId}`}
                      >
                        {participant.participant.firstName}{' '}
                        {participant.participant.lastName}
                      </ChakraLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <AlertED title="Vacío" description="No hay participantes activos" />
          )}
        </Box>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          p="6"
          rounded="lg"
          shadow="base"
          flex={1}
        >
          <Heading as="h4" size="sm" textAlign="center" mb={4}>
            En Espera
          </Heading>
          {participantsWaiting.length > 0 ? (
            <Table size="sm">
              <TableCaption>Total: {participantsWaiting.length}</TableCaption>
              <Tbody>
                {participantsWaiting.map((participant) => (
                  <Tr key={participant.participantId}>
                    <Td>
                      <ChakraLink
                        as={Link}
                        to={`/participants/${participant.participantId}`}
                      >
                        {participant.participant.firstName}{' '}
                        {participant.participant.lastName}
                      </ChakraLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <AlertED
              title="Vacío"
              description="No hay participantes en espera"
            />
          )}
        </Box>

        <Box
          bg={useColorModeValue('white', 'gray.700')}
          p="6"
          rounded="lg"
          shadow="base"
          flex={1}
        >
          <Heading as="h4" size="sm" textAlign="center" mb={4}>
            Dados de Baja
          </Heading>
          {participantsInactive.length > 0 ? (
            <Table size="sm">
              <TableCaption>Total: {participantsInactive.length}</TableCaption>
              <Tbody>
                {participantsInactive.map((participant) => (
                  <Tr key={participant.participantId}>
                    <Td>
                      <ChakraLink
                        as={Link}
                        to={`/participants/${participant.participantId}`}
                      >
                        {participant.participant.firstName}{' '}
                        {participant.participant.lastName}
                      </ChakraLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <AlertED
              title="Vacío"
              description="No hay participantes dados de baja"
            />
          )}
        </Box>
      </Stack>
    </>
  );
}
