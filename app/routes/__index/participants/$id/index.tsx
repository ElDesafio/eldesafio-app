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
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData, useSearchParams } from 'remix';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import type { GetParticipantWithPrograms } from '~/services/participants.service';
import {
  createParticipantDiaryAutoEvent,
  getParticipantWithPrograms,
} from '~/services/participants.service';
import { getLoggedInUser } from '~/services/users.service';
import {
  getAge,
  getFormattedDate,
  getNeighborhoodText,
  getPhoneBelongsToText,
  getSelectedYearFromRequest,
  PartcipantSexText,
  useSelectedYear,
} from '~/util/utils';

import {
  InactiveModal,
  inactiveModalValidator,
} from './components/InactiveModal';
import { ParticipantChartBars } from './components/ParticipantChartBars';
import { ParticipantChartPie } from './components/ParticipantChartPie';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const selectedYear = getSelectedYearFromRequest(request);

  const participant = await getParticipantWithPrograms(+id, selectedYear);

  const loggedinUser = await getLoggedInUser(request);

  if (!participant) {
    throw new Error('Participant not found');
  }

  const isUserAdmin = loggedinUser.isAdmin;

  return { participant, isUserAdmin, timezone: loggedinUser.timezone };
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await inactiveModalValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { description, year, type } = fieldValues.data;

  await db.$transaction(async (db) => {
    const programs = await db.participantsOnPrograms.findMany({
      where: {
        participantId: +id,
        program: {
          year: +year,
        },
      },
      select: {
        programId: true,
      },
    });

    programs.forEach(async (program) => {
      await db.participantsOnPrograms.update({
        where: {
          programId_participantId: {
            programId: program.programId,
            participantId: +id,
          },
        },
        data: {
          status: 'INACTIVE',
          waitingListOrder: null,
          updatedBy: user.id,
        },
      });
      await createParticipantDiaryAutoEvent({
        participantId: +id,
        title: `Dado de baja del programa`,
        type,
        programId: program.programId,
        userId: user.id,
        description: description ?? undefined,
      });
    });

    await db.participantStatus.upsert({
      where: {
        year_participantId: {
          participantId: +id,
          year,
        },
      },
      create: {
        status: 'INACTIVE',
        participantId: +id,
        year,
      },
      update: {
        status: 'INACTIVE',
      },
    });

    return await createParticipantDiaryAutoEvent({
      participantId: +id,
      userId: user.id,
      type: 'YEAR_STATUS_INACTIVE',
      title: `El estado del participante en el año ${year} fue cambiado a: inactivo`,
      description: description ?? undefined,
    });
  });

  const url = new URL(request.url);
  const selectedYear = url.searchParams.get('year');

  let returnURL = `/participants/${id}`;

  if (selectedYear) {
    returnURL += `?year=${selectedYear}`;
  }

  return redirect(returnURL);
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function ParticipantGeneral() {
  const { participant, isUserAdmin, timezone } = useLoaderData<{
    participant: GetParticipantWithPrograms;
    isUserAdmin: boolean;
    timezone: string;
  }>();
  const [btnHover, setBtnHover] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentYear = useSelectedYear();

  const hideProgramsIds = searchParams
    .getAll('hidePrograms')
    .map((programId) => +programId);

  if (!participant) {
    throw new Error('El participante no existe.');
  }

  // const participantYearStatus = participant.status.filter(
  //   (status) => status.year === +currentYear,
  // )[0];

  let statusBtnText: string;
  let statusBtnColor: string;
  let statusBtnVariant: string;
  let tooltipText = `Dar de baja a ${participant.firstName} en el año ${currentYear}`;
  let inactiveModalEnabled = true;

  switch (true) {
    case participant.yearStatus === 'ACTIVE': {
      statusBtnText = 'Activo';
      statusBtnColor = 'blue';
      statusBtnVariant = 'solid';
      break;
    }
    case participant.yearStatus === 'INACTIVE' && participant.wasEverActive: {
      statusBtnText = 'Inactivo';
      statusBtnColor = 'red';
      statusBtnVariant = 'solid';
      tooltipText = 'Para activar al participante agregarlo a algún programa';
      inactiveModalEnabled = false;
      break;
    }
    case participant.yearStatus === 'WAITING': {
      statusBtnText = 'Espera';
      statusBtnColor = 'blue';
      statusBtnVariant = 'outline';
      break;
    }

    default: {
      statusBtnText = 'No participó';
      statusBtnColor = 'gray';
      statusBtnVariant = 'solid';
      tooltipText = 'Para activar al participante agregarlo a algún programa';
      inactiveModalEnabled = false;
      break;
    }
  }

  if (
    (participant.yearStatus === 'ACTIVE' ||
      participant.yearStatus === 'WAITING') &&
    btnHover
  ) {
    statusBtnText = 'Dar de baja';
    statusBtnColor = 'red';
    statusBtnVariant = 'solid';
  }

  const toggleProgram = (programId: number) => {
    if (hideProgramsIds.includes(programId)) {
      searchParams.delete('hidePrograms');
      hideProgramsIds.forEach((pid) => {
        if (programId !== pid) {
          searchParams.append('hidePrograms', pid.toString());
        }
      });
      setSearchParams(searchParams, {
        replace: true,
        state: { scroll: false },
      });
    } else {
      searchParams.append('hidePrograms', programId.toString());
      setSearchParams(searchParams, {
        replace: true,
        state: { scroll: false },
      });
    }
  };

  return (
    <>
      <Flex alignItems="center">
        <Heading as="h3" size="md">
          Datos Personales
        </Heading>
        <Spacer />
        {isUserAdmin && (
          <LinkED to="edit">
            <Button size="sm" leftIcon={<MdEdit />} colorScheme="blue">
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
                <Td width="" fontWeight="600">
                  Fecha de nacimiento:
                </Td>
                <Td>
                  {getFormattedDate({ date: participant.birthday, timezone })}
                </Td>
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
          <Tooltip placement="top-end" hasArrow label={tooltipText}>
            <Button
              variant={statusBtnVariant}
              colorScheme={statusBtnColor}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              onClick={() => {
                if (inactiveModalEnabled) {
                  searchParams.set('inactiveModal', 'true');
                  setSearchParams(searchParams, { replace: true });
                }
              }}
            >
              {statusBtnText}
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
      <Flex alignItems="center">
        <Heading as="h3" size="md" mt={8}>
          Programas y Asistencias
        </Heading>
        <Spacer />
      </Flex>
      <Divider mt="2" mb="8" />
      {participant.allProgramsIds.length > 0 ? (
        <>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing={6}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Table className="general-info-table" variant="simple">
              <Tbody>
                {participant.programs.active.length > 0 && (
                  <Tr>
                    <Td width="" fontWeight="600">
                      Activo:
                    </Td>
                    <Td>
                      <HStack spacing="1">
                        {participant.programs.active.map((program) => (
                          <Button
                            key={program.id}
                            size="xs"
                            colorScheme={
                              hideProgramsIds.includes(program.id)
                                ? 'gray'
                                : 'blue'
                            }
                            onClick={() => toggleProgram(program.id)}
                            color={
                              hideProgramsIds.includes(program.id)
                                ? 'gray'
                                : undefined
                            }
                          >
                            {program.name}
                          </Button>
                        ))}
                      </HStack>
                    </Td>
                  </Tr>
                )}
                {participant.programs.waiting.length > 0 && (
                  <Tr>
                    <Td width="" fontWeight="600">
                      En Espera:
                    </Td>
                    <Td>
                      <HStack spacing="1">
                        {participant.programs.waiting.map((program) => (
                          <Button
                            key={program.id}
                            size="xs"
                            colorScheme={
                              hideProgramsIds.includes(program.id)
                                ? 'gray'
                                : 'blue'
                            }
                            variant={
                              hideProgramsIds.includes(program.id)
                                ? 'solid'
                                : 'outline'
                            }
                            onClick={() => toggleProgram(program.id)}
                            color={
                              hideProgramsIds.includes(program.id)
                                ? 'gray'
                                : undefined
                            }
                          >
                            {program.name}
                          </Button>
                        ))}
                      </HStack>
                    </Td>
                  </Tr>
                )}
                {participant.programs.inactive.length > 0 && (
                  <Tr>
                    <Td width="" fontWeight="600">
                      Dado de Baja:
                    </Td>
                    <Td>
                      <HStack spacing="1">
                        {participant.programs.inactive.map((program) => (
                          <Button
                            key={program.id}
                            size="xs"
                            colorScheme={
                              hideProgramsIds.includes(program.id)
                                ? 'gray'
                                : 'red'
                            }
                            onClick={() => toggleProgram(program.id)}
                            color={
                              hideProgramsIds.includes(program.id)
                                ? 'gray'
                                : undefined
                            }
                          >
                            {program.name}
                          </Button>
                        ))}
                      </HStack>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
            <ParticipantChartPie
              allProgramsIds={participant.allProgramsIds}
              hideProgramsIds={hideProgramsIds}
            />
          </Stack>
          <ParticipantChartBars
            allProgramsIds={participant.allProgramsIds}
            hideProgramsIds={hideProgramsIds}
          />
        </>
      ) : (
        <AlertED
          title="Vacío"
          description="El participante no está en ningún programa"
        />
      )}
      <InactiveModal
        isOpen={searchParams.has('inactiveModal')}
        onClose={() => {
          searchParams.delete('inactiveModal');
          setSearchParams(searchParams, { replace: true });
        }}
        participant={{
          id: participant.id,
          firstName: participant.firstName,
          lastName: participant.lastName,
        }}
      />
    </>
  );
}
