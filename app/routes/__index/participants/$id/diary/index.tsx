import {
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
import { MdAdd } from 'react-icons/md';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData, useSearchParams } from 'remix';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { AlertED } from '~/components/AlertED';
import type { GetParticipantDiary } from '~/services/participants.service';
import { getParticipantDiary } from '~/services/participants.service';
import { getFormattedDate, getParticipantDiaryTypeProps } from '~/util/utils';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = z.object({ id: zfd.numeric() }).parse(params);

  const url = new URL(request.url);

  return await getParticipantDiary({
    participantId: id,
    includeAutoEvents: url.searchParams.get('showAutoEvents') === 'true',
  });
};

export default function ParticipantDiary() {
  const diary = useLoaderData<GetParticipantDiary>();
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
                <Td whiteSpace="nowrap">{getFormattedDate(event.date)}</Td>
                <Td>
                  <VStack alignItems="flex-start">
                    <Text fontSize="md" mb={1} fontWeight="500">
                      <Link to={`${event.id}`}>{event.title}</Link>
                    </Text>
                    <HStack spacing={1}>
                      {event.programs.map(({ program }) => (
                        <Link key={program.id} to={`/programs/${program.id}`}>
                          <Tag size="sm" variant="outline" colorScheme="gray">
                            {program.name}
                          </Tag>
                        </Link>
                      ))}
                    </HStack>
                  </VStack>
                </Td>
                <Td>
                  <Tag
                    size="sm"
                    variant={getParticipantDiaryTypeProps(event.type).variant}
                    colorScheme={
                      getParticipantDiaryTypeProps(event.type).tagColor
                    }
                  >
                    {getParticipantDiaryTypeProps(event.type).text}
                  </Tag>
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
