/* eslint-disable sonarjs/no-identical-functions */
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Spinner,
  Stack,
  Table,
  TableCaption,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  PrefetchPageLinks,
  useLoaderData,
  useTransition,
} from '@remix-run/react';
import mudder from 'mudder';
import { FaAngleDown, FaAngleUp, FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { MarkdownEditor } from '~/components/MarkdownEditor/markdown-editor';
import { ProgramChartPie } from '~/components/Program/ProgramChartPie';
import { db } from '~/services/db.server';
import { getProgram } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';
import { getDayByName, ProgramSexText } from '~/util/utils';

enum FormTypeWaiting {
  UP = 'UP',
  DOWN = 'DOWN',
  REMOVE = 'REMOVE',
}

export async function loader({ request, params }: LoaderArgs) {
  const loggedinUser = await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const program = await getProgram({
    id: Number(id),
    includeParticipants: true,
  });

  if (!program) {
    throw new Response('El programa no existe', {
      status: 404,
      statusText: 'El programa no existe',
    });
  }

  const facilitators = program.educators.filter(
    (educator) => educator.isFacilitator,
  );
  const volunteers = program.educators.filter(
    (educator) => !educator.isFacilitator,
  );

  const participantsActive = program.participants
    .filter((participant) => participant.status === 'ACTIVE')
    .sort((a, b) =>
      a.participant.firstName < b.participant.firstName ? -1 : 1,
    );
  const participantsInactive = program.participants
    .filter((participant) => participant.status === 'INACTIVE')
    .sort((a, b) =>
      a.participant.firstName < b.participant.firstName ? -1 : 1,
    );
  const participantsWaiting = program.participants
    .filter((participant) => participant.status === 'WAITING')
    .sort((a, b) => {
      if (a.waitingListOrder && b.waitingListOrder) {
        return a.waitingListOrder < b.waitingListOrder ? -1 : 1;
      }
      return 0;
    });

  const isUserAdmin = loggedinUser.isAdmin;

  return json({
    program,
    isUserAdmin,
    facilitators,
    volunteers,
    participantsActive,
    participantsInactive,
    participantsWaiting,
  });
}

export async function action({ request, params }: ActionArgs) {
  const { id: programId } = z.object({ id: z.string() }).parse(params);

  const user = await getLoggedInUser(request);

  const form = await request.formData();
  const participantId = z.string().parse(form.get('participantId'));

  const waitingList = await db.participantsOnPrograms.findMany({
    where: {
      programId: +programId,
      status: 'WAITING',
      waitingListOrder: {
        not: null,
      },
    },
    orderBy: {
      waitingListOrder: 'asc',
    },
  });

  const participantIndex = waitingList.findIndex(
    (p) => p.participantId === +participantId,
  );

  switch (form.get('type') as FormTypeWaiting) {
    case FormTypeWaiting.DOWN: {
      // Check if there is an element after the current one
      const participantAfter = waitingList[participantIndex + 1];
      const participantAfter2 = waitingList[participantIndex + 2];

      const lower = participantAfter?.waitingListOrder ?? '';
      const upper = participantAfter2?.waitingListOrder ?? '';

      const newWaitingListString = mudder.alphabet.mudder(lower, upper)[0];

      return await db.participantsOnPrograms.update({
        where: {
          programId_participantId: {
            programId: +programId,
            participantId: +participantId,
          },
        },
        data: {
          waitingListOrder: newWaitingListString,
          updatedBy: user.id,
        },
      });
    }

    case FormTypeWaiting.UP: {
      // Check if there is an element after the current one
      const participantBefore = waitingList[participantIndex - 1];
      const participantBefore2 = waitingList[participantIndex - 2];

      const lower = participantBefore2?.waitingListOrder ?? '';
      const upper = participantBefore?.waitingListOrder ?? '';

      const newWaitingListString = mudder.alphabet.mudder(lower, upper)[0];

      return await db.participantsOnPrograms.update({
        where: {
          programId_participantId: {
            programId: +programId,
            participantId: +participantId,
          },
        },
        data: {
          waitingListOrder: newWaitingListString,
          updatedBy: user.id,
        },
      });
    }

    case FormTypeWaiting.REMOVE: {
      return await db.participantsOnPrograms.update({
        where: {
          programId_participantId: {
            programId: +programId,
            participantId: +participantId,
          },
        },
        data: {
          status: 'INACTIVE',
          waitingListOrder: null,
          updatedBy: user.id,
        },
      });
    }
    default: {
      throw new Error('Form Type not supported');
    }
  }
}

export default function ProgramGeneral() {
  const {
    program,
    isUserAdmin,
    facilitators,
    volunteers,
    participantsActive,
    participantsInactive,
    participantsWaiting,
  } = useLoaderData<typeof loader>();
  const transition = useTransition();

  if (!program) {
    throw new Error("Program doesn't exist");
  }

  const isLoading = (participantId: number, FormType: FormTypeWaiting) => {
    return (
      +(transition.submission?.formData.get(
        'participantId',
      ) as any as string) === participantId &&
      transition.submission?.formData.get('type') === FormType
    );
  };

  return (
    <>
      <PrefetchPageLinks page={`/programs/${program.id}/attendance`} />

      <Flex alignItems="center">
        <Heading as="h3" size="md">
          Datos Generales
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
          alignItems="flex-start"
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
          <ProgramChartPie />
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
              <TableCaption>
                Total:{' '}
                <Text as="span" fontWeight={600}>
                  {participantsActive.length}
                </Text>
              </TableCaption>
              <Tbody>
                {participantsActive.map((participant) => (
                  <Tr key={participant.participantId}>
                    <Td>
                      <ChakraLink
                        as={LinkED}
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
              <TableCaption>
                Total:{' '}
                <Text as="span" fontWeight={600}>
                  {participantsWaiting.length}
                </Text>
              </TableCaption>
              <Tbody>
                {participantsWaiting.map((participant, index) => (
                  <Tr key={participant.participantId}>
                    <Td>
                      {index + 1}.{' '}
                      <ChakraLink
                        as={LinkED}
                        to={`/participants/${participant.participantId}`}
                      >
                        {participant.participant.firstName}{' '}
                        {participant.participant.lastName}
                      </ChakraLink>
                    </Td>
                    <Td width="40px">
                      <HStack spacing={1} justifyContent="center">
                        {index + 1 !== participantsWaiting.length &&
                          participantsWaiting.length > 1 && (
                            <Form method="post">
                              <input
                                name="type"
                                type="hidden"
                                value={FormTypeWaiting.DOWN}
                              />
                              <input
                                name="participantId"
                                type="hidden"
                                value={participant.participantId}
                              />

                              <IconButton
                                type="submit"
                                size="xs"
                                variant="ghost"
                                aria-label="Move Down"
                                icon={
                                  isLoading(
                                    participant.participantId,
                                    FormTypeWaiting.DOWN,
                                  ) ? (
                                    <Spinner size="xs" />
                                  ) : (
                                    <FaAngleDown />
                                  )
                                }
                              />
                            </Form>
                          )}
                        {index !== 0 && participantsWaiting.length > 1 && (
                          <Form method="post">
                            <input
                              name="type"
                              type="hidden"
                              value={FormTypeWaiting.UP}
                            />
                            <input
                              name="participantId"
                              type="hidden"
                              value={participant.participantId}
                            />
                            <IconButton
                              type="submit"
                              size="xs"
                              variant="ghost"
                              aria-label="Move Up"
                              icon={
                                isLoading(
                                  participant.participantId,
                                  FormTypeWaiting.UP,
                                ) ? (
                                  <Spinner size="xs" />
                                ) : (
                                  <FaAngleUp />
                                )
                              }
                            />
                          </Form>
                        )}
                        <Popover
                          returnFocusOnClose={false}
                          placement="top"
                          closeOnBlur={true}
                        >
                          <PopoverTrigger>
                            <IconButton
                              size="xs"
                              variant="ghost"
                              aria-label="Delete"
                              icon={
                                isLoading(
                                  participant.participantId,
                                  FormTypeWaiting.REMOVE,
                                ) ? (
                                  <Spinner size="xs" />
                                ) : (
                                  <FaTrashAlt />
                                )
                              }
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverHeader fontWeight="semibold">
                              Confirmación
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              ¿Estás seguro que querés sacarlo de la lista de
                              espera?
                            </PopoverBody>
                            <PopoverFooter
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <ButtonGroup size="sm">
                                <Form method="post">
                                  <input
                                    name="type"
                                    type="hidden"
                                    value={FormTypeWaiting.REMOVE}
                                  />
                                  <input
                                    name="participantId"
                                    type="hidden"
                                    value={participant.participantId}
                                  />
                                  <Button
                                    type="submit"
                                    colorScheme="red"
                                    isLoading={
                                      !!isLoading(
                                        participant.participantId,
                                        FormTypeWaiting.REMOVE,
                                      )
                                    }
                                  >
                                    Borrar
                                  </Button>
                                </Form>
                              </ButtonGroup>
                            </PopoverFooter>
                          </PopoverContent>
                        </Popover>
                      </HStack>
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
              <TableCaption>
                Total:{' '}
                <Text as="span" fontWeight={600}>
                  {participantsInactive.length}
                </Text>
              </TableCaption>
              <Tbody>
                {participantsInactive.map((participant) => (
                  <Tr key={participant.participantId}>
                    <Td>
                      <ChakraLink
                        as={LinkED}
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
      <Heading as="h3" size="md" mt={8}>
        Resultados
      </Heading>
      <Divider mb={3} />
      {program?.description ? (
        <MarkdownEditor initialContent={program.description} editable={false} />
      ) : (
        <AlertED
          title="Vacío"
          description="No hay Resultados para este programa. Los podés agregar haciendo click en el botón de 'editar'."
        />
      )}
    </>
  );
}
