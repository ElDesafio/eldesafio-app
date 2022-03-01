import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Img,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';

import { db } from '~/services/db.server';
import { getAge } from '~/util/utils';

import type { Participant } from '.prisma/client';

export const loader: LoaderFunction = async () => {
  return await db.participant.findMany({
    orderBy: { firstName: 'asc' },
  });
};

export default function Participants() {
  const participants = useLoaderData<Participant[]>();
  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="7xl">
          <Flex>
            <Heading size="lg" mb="0">
              Participantes
            </Heading>
            <Spacer />
            <Link to="new">
              <Button leftIcon={<MdAdd />} colorScheme="blue">
                Nuevo
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      <Box as="main" py="8" flex="1">
        <Container maxW="7xl">
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p="6"
            rounded="lg"
            shadow="base"
            overflowX="auto"
          >
            <Table borderWidth="1px" fontSize="sm">
              <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
                <Tr>
                  <Th whiteSpace="nowrap" scope="col">
                    PARTICIPANTE
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    EDAD
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    DNI
                  </Th>
                  <Th whiteSpace="nowrap" scope="col" />
                </Tr>
              </Thead>
              <Tbody>
                {participants.map((participant) => (
                  <Tr key={participant.id}>
                    <Td whiteSpace="nowrap">
                      <Stack direction="row" spacing="4" align="center">
                        <Box flexShrink={0}>
                          <Avatar
                            size="md"
                            src={participant.picture || undefined}
                          />
                        </Box>
                        <Box>
                          <Box fontSize="sm" fontWeight="medium">
                            <Link to={`/participants/${participant.id}`}>
                              {participant.firstName} {participant.lastName}
                            </Link>
                          </Box>
                          <Box fontSize="sm" color="gray.500">
                            cambiareste@correo.com
                          </Box>
                        </Box>
                      </Stack>
                    </Td>
                    <Td>{getAge(participant.birthday)}</Td>
                    <Td>{participant.dni}</Td>
                    <Td textAlign="right">
                      <Link to={`${participant.id}/edit`}>
                        <Button variant="link" colorScheme="blue">
                          Edit
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Container>
      </Box>
    </>
  );
}
