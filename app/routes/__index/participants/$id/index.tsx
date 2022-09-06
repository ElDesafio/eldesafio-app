import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  useLoaderData,
  useSearchParams,
  useTransition,
} from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdCheckCircle, MdEdit, MdHighlightOff } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import { FormSwitch } from '~/components/Form/FormSwitch';
import { FormTextArea } from '~/components/Form/FormTextArea';
import { LinkED } from '~/components/LinkED';
import {
  InactiveModal,
  inactiveModalValidator,
} from '~/components/Participants/InactiveModal';
import { ParticipantChartBars } from '~/components/Participants/ParticipantChartBars';
import { ParticipantChartPie } from '~/components/Participants/ParticipantChartPie';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import {
  createParticipantDiaryAutoEvent,
  getParticipantWithPrograms,
} from '~/services/participants.service';
import { getLoggedInUser } from '~/services/users.service';
import type { CommitmentTableMonth } from '~/util/utils';
import {
  commitmentTableProps,
  convertStringToNumberForZod,
  getAge,
  getFormattedDate,
  getNeighborhoodText,
  getPhoneBelongsToText,
  getSelectedYearFromRequest,
  PartcipantSexText,
  schemaCheckbox,
  useSelectedYear,
} from '~/util/utils';

const commitmentSchema = z
  .object({
    commitmentVolunteer: schemaCheckbox,
    commitmentDonation: schemaCheckbox,
    year: z.preprocess(
      convertStringToNumberForZod,
      z.number({ required_error: 'El año no puede estar vacío' }).positive(),
    ),
  })
  .refine(
    ({ commitmentDonation, commitmentVolunteer }) =>
      commitmentDonation || commitmentVolunteer,
    {
      path: ['commitmentVolunteer'],
      message: 'Se requiere al menos un compromiso',
    },
  );
export const commitmentValidator = withZod(commitmentSchema);

const commitmentMonthSchema = z.object({
  status: schemaCheckbox,
  description: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable(),
  ),
  year: z.preprocess(
    convertStringToNumberForZod,
    z.number({ required_error: 'El año no puede estar vacío' }).positive(),
  ),
  month: z.string(),
});
export const commitmentMonthValidator = withZod(commitmentMonthSchema);

export async function loader({ params, request }: LoaderArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const selectedYear = getSelectedYearFromRequest(request);

  const participant = await getParticipantWithPrograms(+id, selectedYear);

  const loggedinUser = await getLoggedInUser(request);

  if (!participant) {
    throw new Error('Participant not found');
  }

  const isUserAdmin = loggedinUser.isAdmin;

  return json({ participant, isUserAdmin, timezone: loggedinUser.timezone });
}

// ACTION
export async function action({ request, params }: ActionArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  let returnToYear: number | undefined = undefined;

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  if (formData.formType === 'modifyCommitmentMonth') {
    const fieldValues = await commitmentMonthValidator.validate(formData);

    if (fieldValues.error) return validationError(fieldValues.error);

    const { status, description, month, year } = fieldValues.data;

    returnToYear = year;

    await db.participantCommitment.update({
      where: {
        year_participantId: {
          participantId: +id,
          year,
        },
      },
      data: {
        [`${month}Status`]: status,
        [`${month}Description`]: description,
      },
    });
  }

  if (formData.formType === 'modifyCommitment') {
    const fieldValues = await commitmentValidator.validate(formData);

    if (fieldValues.error) return validationError(fieldValues.error);

    const { commitmentVolunteer, commitmentDonation, year } = fieldValues.data;

    returnToYear = year;

    await db.participantCommitment.upsert({
      where: {
        year_participantId: {
          participantId: +id,
          year,
        },
      },
      create: {
        commitmentDonation,
        commitmentVolunteer,
        participantId: +id,
        year,
      },
      update: {
        commitmentDonation,
        commitmentVolunteer,
      },
    });
  }

  if (formData.formType === 'changeYearStatus') {
    const fieldValues = await inactiveModalValidator.validate(formData);

    if (fieldValues.error) return validationError(fieldValues.error);

    const { description, year, type } = fieldValues.data;

    returnToYear = year;

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
  }

  const url = new URL(request.url);
  const selectedYear = url.searchParams.get('year') || (returnToYear ?? null);

  let returnURL = `/participants/${id}`;

  if (selectedYear) {
    returnURL += `?year=${selectedYear}`;
  }

  return redirect(returnURL);
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function ParticipantGeneral() {
  const { participant, isUserAdmin, timezone } = useLoaderData<typeof loader>();
  const [btnHover, setBtnHover] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedYear = useSelectedYear();

  const hideProgramsIds = searchParams
    .getAll('hidePrograms')
    .map((programId) => +programId);

  if (!participant) {
    throw new Error('El participante no existe.');
  }

  let statusBtnText: string;
  let statusBtnColor: string;
  let statusBtnVariant: string;
  let tooltipText = `Dar de baja a ${participant.firstName} en el año ${selectedYear}`;
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

  const transition = useTransition();

  const isModifyingCommitment =
    transition?.submission?.formData.get('formType') === `modifyCommitment`;

  const isModifyingCommitmentMonth =
    transition?.submission?.formData.get('formType') ===
    `modifyCommitmentMonth`;

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
              <Tr>
                <Td fontWeight="600">¿Presentó DNI?:</Td>
                <Td>
                  <Text
                    as="span"
                    color={!participant.presentedDNI ? 'red' : undefined}
                  >
                    {participant.presentedDNI ? 'Sí' : 'No'}
                  </Text>
                </Td>
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
                        color="white"
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
                        color="white"
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
              <Tr>
                <Td fontWeight="600">¿Presentó apto médico?:</Td>
                <Td>
                  <Text
                    as="span"
                    color={
                      !participant.presentedHealthCertificate
                        ? 'red'
                        : undefined
                    }
                  >
                    {participant.presentedHealthCertificate ? 'Sí' : 'No'}{' '}
                    {participant.presentedHealthCertificate &&
                    participant.healthCertificateDate
                      ? `(${getFormattedDate({
                          date: participant.healthCertificateDate,
                          timezone,
                        })})`
                      : ''}
                  </Text>
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
          <Tooltip
            placement="top-end"
            hasArrow
            label={tooltipText}
            color="white"
          >
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
      <Flex alignItems="center" justifyContent="space-between" mt={8}>
        <Heading as="h3" size="md">
          Compromiso de los padres {selectedYear}
        </Heading>
        <Popover
          key={`popover-commitment-${selectedYear}-${participant.id}`}
          returnFocusOnClose={false}
          placement="left-end"
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <Button colorScheme="blue" size="sm">
              Editar
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ValidatedForm
              validator={commitmentValidator}
              defaultValues={{
                commitmentDonation: participant.commitment?.commitmentDonation,
                commitmentVolunteer:
                  participant.commitment?.commitmentVolunteer,
              }}
              method="post"
              noValidate
            >
              <PopoverHeader fontWeight="semibold">
                Cambiar compromiso {selectedYear}
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <FormSwitch
                  name="commitmentDonation"
                  label="Donación mensual"
                  value="true"
                  mb={2}
                />
                <FormSwitch
                  name="commitmentVolunteer"
                  label="Voluntariado"
                  value="true"
                />
                <input name="year" type="hidden" value={selectedYear} />
                <input name="formType" type="hidden" value="modifyCommitment" />
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isModifyingCommitment}
                  >
                    Modificar
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </ValidatedForm>
          </PopoverContent>
        </Popover>
      </Flex>
      <Divider mt="2" mb="8" />
      {(participant.commitment?.commitmentDonation ||
        participant.commitment?.commitmentVolunteer) && (
        <Box>
          <Text as="span">
            Los padres se comprometieron en el {selectedYear} a:
          </Text>{' '}
          {participant.commitment?.commitmentDonation && (
            <Tag colorScheme="blue" variant="outline">
              Donación Mensual
            </Tag>
          )}{' '}
          {participant.commitment?.commitmentVolunteer && (
            <Tag colorScheme="blue" variant="outline">
              Voluntariado
            </Tag>
          )}
          <Table borderWidth="1px" fontSize="lg" size="sm" width="auto" mt={6}>
            <Thead bg="gray.50">
              <Tr>
                {[
                  'april',
                  'may',
                  'june',
                  'july',
                  'august',
                  'september',
                  'october',
                  'november',
                  'december',
                ].map((month) => (
                  <Th
                    key={`${month}-${selectedYear}`}
                    whiteSpace="nowrap"
                    scope="col"
                    width="60px"
                    textAlign="center"
                    textTransform="initial"
                    fontWeight="400"
                    lineHeight="1.2"
                    pr={1}
                    pl={1}
                  >
                    {
                      commitmentTableProps(month as CommitmentTableMonth)
                        .monthName
                    }
                    <br />
                    <Popover
                      returnFocusOnClose={false}
                      placement="left-end"
                      closeOnBlur={true}
                    >
                      <PopoverTrigger>
                        <Button
                          variant="solid"
                          colorScheme="gray"
                          size="xs"
                          pr={1}
                          pl={1}
                        >
                          Editar
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <ValidatedForm
                          validator={commitmentMonthValidator}
                          defaultValues={{
                            status:
                              participant.commitment?.[
                                `${month}Status` as keyof typeof participant.commitment.aprilStatus
                              ],
                            description:
                              participant.commitment?.[
                                `${month}Description` as keyof typeof participant.commitment.aprilDescription
                              ],
                          }}
                          method="post"
                          noValidate
                        >
                          <PopoverHeader fontWeight="semibold" fontSize="md">
                            Compromiso{' '}
                            {
                              commitmentTableProps(
                                month as CommitmentTableMonth,
                              ).monthName
                            }
                            -{selectedYear}
                          </PopoverHeader>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody textAlign="left">
                            <FormSwitch
                              name="status"
                              label="¿Cumplieron con el compromiso?"
                              value="true"
                              mb={2}
                            />
                            <FormTextArea
                              name="description"
                              label="Comentario"
                            />
                            <input
                              name="year"
                              type="hidden"
                              value={selectedYear}
                            />
                            <input name="month" type="hidden" value={month} />
                            <input
                              name="formType"
                              type="hidden"
                              value="modifyCommitmentMonth"
                            />
                          </PopoverBody>
                          <PopoverFooter
                            display="flex"
                            justifyContent="flex-end"
                          >
                            <ButtonGroup size="sm">
                              <Button
                                type="submit"
                                colorScheme="blue"
                                isLoading={isModifyingCommitmentMonth}
                              >
                                Modificar
                              </Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </ValidatedForm>
                      </PopoverContent>
                    </Popover>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                {[
                  'aprilStatus',
                  'mayStatus',
                  'juneStatus',
                  'julyStatus',
                  'augustStatus',
                  'septemberStatus',
                  'octoberStatus',
                  'novemberStatus',
                  'decemberStatus',
                ].map((status) => (
                  <Td key={status} textAlign="center" fontSize="lg">
                    {participant.commitment ? (
                      participant.commitment[
                        status as keyof typeof participant.commitment
                      ] === true ? (
                        <Icon color="blue.500" as={MdCheckCircle} />
                      ) : participant.commitment[
                          status as keyof typeof participant.commitment
                        ] === false ? (
                        <Icon color="red.500" as={MdHighlightOff} />
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                  </Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
        </Box>
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
