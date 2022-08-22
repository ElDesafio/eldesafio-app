import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Spacer,
  Switch,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { MdAdd } from 'react-icons/md';
import { ClientOnly } from 'remix-utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import type { GetUserDiary } from '~/services/users.service';
import { getLoggedInUser, getUserDiary } from '~/services/users.service';
import {
  getFormattedDate,
  getSelectedYearFromRequest,
  getUserDiaryTypeProps,
} from '~/util/utils';

export const loader = async ({ params, request }: LoaderArgs) => {
  const { id } = z.object({ id: zfd.numeric() }).parse(params);

  const user = await getLoggedInUser(request);

  const url = new URL(request.url);

  const selectedYear = getSelectedYearFromRequest(request);

  const diary = await getUserDiary({
    userId: id,
    includeAutoEvents: url.searchParams.get('showAutoEvents') === 'true',
    year: selectedYear,
  });

  const timezone = user.timezone;

  return { diary, timezone };
};

export default function UserDiary() {
  const { diary, timezone } = useLoaderData<{
    diary: GetUserDiary;
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
                        <LinkED to={`${event.id}`}>{event.title}</LinkED>
                      </Text>
                      <HStack spacing={1}>
                        {event.programs.map(({ program }) => (
                          <LinkED
                            key={program.id}
                            to={`/programs/${program.id}`}
                          >
                            <Tag size="sm" variant="outline" colorScheme="gray">
                              {program.name}
                            </Tag>
                          </LinkED>
                        ))}
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <Tag
                        size="sm"
                        whiteSpace="nowrap"
                        variant={getUserDiaryTypeProps(event.type).variant}
                        colorScheme={getUserDiaryTypeProps(event.type).tagColor}
                      >
                        {getUserDiaryTypeProps(event.type).text}
                      </Tag>
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
          description="No hay entradas en el diario del usuario"
        />
      )}
    </>
  );
}
