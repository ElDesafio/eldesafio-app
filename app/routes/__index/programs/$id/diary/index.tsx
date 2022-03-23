import {
  AvatarGroup,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link as ChakraLink,
  Spacer,
  Switch,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { MdAdd, MdPerson } from 'react-icons/md';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData, useSearchParams } from 'remix';
import { ClientOnly } from 'remix-utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { AlertED } from '~/components/AlertED';
import { TooltipAvatar } from '~/components/TooltipAvatar';
import type { GetProgramDiary } from '~/services/programs.service';
import { getProgramDiary } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';
import { getFormattedDate, getParticipantDiaryTypeProps } from '~/util/utils';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = z.object({ id: zfd.numeric() }).parse(params);

  const user = await getLoggedInUser(request);

  const url = new URL(request.url);

  const diary = await getProgramDiary({
    programId: id,
    includeAutoEvents: url.searchParams.get('showAutoEvents') === 'true',
  });

  const timezone = user.timezone;

  return { diary, timezone };
};

export default function ParticipantDiary() {
  const { diary, timezone } =
    useLoaderData<{ diary: GetProgramDiary; timezone: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Flex alignItems="center">
        <Heading size="md" mb="0">
          Diario
        </Heading>
        <Spacer />
        <HStack spacing={8}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="show-inactives" mb="0">
              Mostrar eventos automáticos
            </FormLabel>
            <Switch
              id="show-auto-events"
              isChecked={searchParams.get('showAutoEvents') === 'true'}
              onChange={(event) => {
                if (event.target.checked) {
                  searchParams.set('showAutoEvents', 'true');
                } else {
                  searchParams.delete('showAutoEvents');
                }
                setSearchParams(searchParams);
              }}
            />
          </FormControl>
          <Link to="new">
            <Button size="sm" leftIcon={<MdAdd />} colorScheme="blue">
              Nuevo Evento
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Divider mt="2" mb="8" />
      {diary.length > 0 ? (
        <Table borderWidth="1px" size="sm">
          <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
            <Tr>
              <Th whiteSpace="nowrap" scope="col" width="200px">
                FECHA
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                DESCRIPCIÓN
              </Th>
              <Th whiteSpace="nowrap" scope="col" width="1%">
                TIPO
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {diary.map((event) => (
              <Tr key={event.id}>
                <Td whiteSpace="nowrap">
                  <Text>
                    <ClientOnly>
                      {() => getFormattedDate({ date: event.date, timezone })}
                    </ClientOnly>
                  </Text>
                  <Text mt={1} color="gray.500">
                    <ClientOnly>
                      {() =>
                        getFormattedDate({
                          date: event.date,
                          timezone,
                          format: 'TIME_SIMPLE',
                        })
                      }
                    </ClientOnly>
                  </Text>
                </Td>
                <Td>
                  <VStack alignItems="flex-start">
                    <Text fontSize="md" mb={1} fontWeight="500">
                      <ChakraLink
                        as={Link}
                        to={
                          'participants' in event
                            ? `${event.id}`
                            : `/participants/${event.participantId}/diary/${event.id}`
                        }
                      >
                        {event.title}{' '}
                        {!('participants' in event) && (
                          <Text as="span" color="gray.500" fontSize="sm">
                            ({event.participant.firstName}{' '}
                            {event.participant.lastName})
                          </Text>
                        )}
                      </ChakraLink>
                    </Text>
                    <HStack spacing={1}>
                      <AvatarGroup>
                        {/* If there are participants in the event, it means it's a Program event. If not, it's a Participant event */}
                        {'participants' in event &&
                          event.participants.map(({ participant }) => (
                            <TooltipAvatar
                              size="sm"
                              key={participant.id}
                              linkTo={`/participants/${participant.id}`}
                              name={`${participant.firstName} ${participant.lastName}`}
                              src={participant.picture ?? undefined}
                            />
                          ))}
                        {!('participants' in event) && (
                          <Link to={`/participants/${event.participantId}`}>
                            <TooltipAvatar
                              size="sm"
                              key={event.participant.id}
                              linkTo={`/participants/${event.participant.id}`}
                              name={`${event.participant.firstName} ${event.participant.lastName}`}
                              src={event.participant.picture ?? undefined}
                            />
                          </Link>
                        )}
                      </AvatarGroup>
                    </HStack>
                  </VStack>
                </Td>
                <Td>
                  <HStack spacing={1}>
                    <Tag
                      size="sm"
                      variant={getParticipantDiaryTypeProps(event.type).variant}
                      colorScheme={
                        getParticipantDiaryTypeProps(event.type).tagColor
                      }
                    >
                      {getParticipantDiaryTypeProps(event.type).text}
                    </Tag>
                    {!('participants' in event) && (
                      <Tooltip
                        placement="top-start"
                        label="Es un evento en el diario del participante"
                      >
                        <IconButton
                          fontSize="lg"
                          variant="link"
                          size="sm"
                          aria-label="Evento en el diario del participante"
                          icon={<MdPerson />}
                        />
                      </Tooltip>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <AlertED
          title="Vacío"
          description="No hay entradas en el diario del participante"
        />
      )}
    </>
  );
}
