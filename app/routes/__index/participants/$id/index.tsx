import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import type { Participant } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { Link, useLoaderData } from 'remix';
import { z } from 'zod';

import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import { getLoggedInUser } from '~/services/users.service';
import {
  getAge,
  getFormattedDate,
  getNeighborhoodText,
  getPhoneBelongsToText,
  isAdmin,
  PartcipantSexText,
} from '~/util/utils';

import { ParticipantChartPie } from './components/ParticipantChartPie';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participant = await db.participant.findUnique({ where: { id: +id } });

  let authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const loggedinUser = await getLoggedInUser(authUser.id);

  if (!loggedinUser) {
    throw new Error('User not found');
  }
  if (!participant) {
    throw new Error('Participant not found');
  }

  const isUserAdmin = isAdmin(loggedinUser);

  return { participant, isUserAdmin };
};

export default function ParticipantGeneral() {
  const { participant, isUserAdmin } =
    useLoaderData<{ participant: Participant; isUserAdmin: boolean }>();

  return (
    <>
      <Flex alignItems="center">
        <Heading as="h3" size="md">
          Datos Personales
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
          <Table className="general-info-table" variant="simple">
            <Tbody>
              <Tr>
                <Td width="" fontWeight="600">
                  Fecha de nacimiento:
                </Td>
                <Td>{getFormattedDate(participant.birthday)}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Edad:</Td>
                <Td>{getAge(participant.birthday)}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Sexo:</Td>
                <Td>{PartcipantSexText[participant.sex]}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">DNI:</Td>
                <Td>{participant.dni}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Email:</Td>
                <Td>{participant.email}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Table className="general-info-table" variant="simple">
            <Tbody>
              <Tr>
                <Td fontWeight="600">Dirección:</Td>
                <Td>{participant.address}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Barrio:</Td>
                <Td>
                  {participant.neighborhood &&
                    getNeighborhoodText(participant.neighborhood)}
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Ciudad:</Td>
                <Td>{participant.city}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Teléfono 1:</Td>
                <Td>
                  <HStack alignItems="center" spacing={2}>
                    <span>{participant.phone1}</span>
                    {participant.phone1HasWhatsapp && (
                      <Tooltip
                        hasArrow
                        placement="top"
                        label="Tiene Whatsapp"
                        alignItems="center"
                      >
                        <Box alignItems="center" pt={1}>
                          <Icon color="green.500" as={FaWhatsapp} />
                        </Box>
                      </Tooltip>
                    )}
                    {participant.phone1BelongsTo && (
                      <Text as="i" colorScheme="gray">
                        ({getPhoneBelongsToText(participant.phone1BelongsTo)})
                      </Text>
                    )}
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Teléfono 2:</Td>
                <Td>
                  <HStack alignItems="center" spacing={2}>
                    <span>{participant.phone2}</span>
                    {participant.phone2HasWhatsapp && (
                      <Tooltip
                        hasArrow
                        placement="top"
                        label="Tiene Whatsapp"
                        alignItems="center"
                      >
                        <Box alignItems="center" pt={1}>
                          <Icon color="green.500" as={FaWhatsapp} />
                        </Box>
                      </Tooltip>
                    )}
                    {participant.phone2BelongsTo && (
                      <Text as="i" colorScheme="gray">
                        ({getPhoneBelongsToText(participant.phone2BelongsTo)})
                      </Text>
                    )}
                  </HStack>
                </Td>
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
          <Avatar size="2xl" src={participant.picture || undefined} />
          <Box>
            <HStack spacing="5">
              <Button>{participant.active ? 'Activo' : 'Inactivo'}</Button>
            </HStack>
          </Box>
        </Stack>
      </Stack>
      <Flex alignItems="center">
        <Heading as="h3" size="md" mt={8}>
          Programas y Asistencias
        </Heading>
        <Spacer />
      </Flex>
      <Divider mt="2" mb="8" />
      <ParticipantChartPie />
    </>
  );
}
