import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
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
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { MdAdd, MdSchool } from 'react-icons/md';
import { ClientOnly } from 'remix-utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import type { GetParticipantDiary } from '~/services/participants.service';
import { getParticipantDiary } from '~/services/participants.service';
import { getLoggedInUser } from '~/services/users.service';
import {
  getFormattedDate,
  getParticipantDiaryTypeProps,
  getSelectedYearFromRequest,
} from '~/util/utils';

export const loader = async ({ params, request }: LoaderArgs) => {
  const { id } = z.object({ id: zfd.numeric() }).parse(params);

  const user = await getLoggedInUser(request);

  const url = new URL(request.url);

  const selectedYear = getSelectedYearFromRequest(request);

  const diary = await getParticipantDiary({
    participantId: id,
    includeAutoEvents: url.searchParams.get('showAutoEvents') === 'true',
    includeProgramEvents: true,
    year: selectedYear,
  });

  const timezone = user.timezone;

  return { diary, timezone };
};

export default function ParticipantDiary() {
  const { diary, timezone } = useLoaderData<{
    diary: GetParticipantDiary;
    timezone: string;
  }>();
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
          <LinkED to="new">
            <Button size="sm" leftIcon={<MdAdd />} colorScheme="blue">
              Nuevo Evento
            </Button>
          </LinkED>
        </HStack>
      </Flex>
      <Divider mt="2" mb="8" />
      {diary.length > 0 ? (
        <Box border="1px solid" borderColor="gray.100" borderRadius="lg">
          <Table size="sm">
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
                <Tr
                  key={'programs' in event ? event.id : `program-${event.id}`}
                >
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
                        <LinkED
                          to={
                            'programs' in event
                              ? `${event.id}`
                              : `/programs/${event.programId}/diary/${event.id}`
                          }
                        >
                          {event.title}
                        </LinkED>
                      </Text>
                      <HStack spacing={1}>
                        {/* If there are programs in the event, it means it's a Participant event. If not, it's a Program event */}
                        {'programs' in event &&
                          event.programs.map(({ program }) => (
                            <LinkED
                              key={program.id}
                              to={`/programs/${program.id}`}
                            >
                              <Tag
                                size="sm"
                                variant="outline"
                                colorScheme="gray"
                              >
                                {program.name}
                              </Tag>
                            </LinkED>
                          ))}
                        {!('programs' in event) && (
                          <LinkED to={`/programs/${event.programId}`}>
                            <Tag size="sm" variant="outline" colorScheme="gray">
                              {event.program.name}
                            </Tag>
                          </LinkED>
                        )}
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <Tag
                        size="sm"
                        whiteSpace="nowrap"
                        variant={
                          getParticipantDiaryTypeProps(event.type).variant
                        }
                        colorScheme={
                          getParticipantDiaryTypeProps(event.type).tagColor
                        }
                      >
                        {getParticipantDiaryTypeProps(event.type).text}
                      </Tag>
                      {!('programs' in event) && (
                        <Tooltip
                          placement="top-start"
                          label="Es un evento en el diario del programa"
                        >
                          <IconButton
                            fontSize="lg"
                            variant="link"
                            size="sm"
                            aria-label="Evento en el diario del programa"
                            icon={<MdSchool />}
                          />
                        </Tooltip>
                      )}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <AlertED
          title="Vacío"
          description="No hay entradas en el diario del participante"
        />
      )}
    </>
  );
}
