import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { MdAdd } from 'react-icons/md';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';

import { db } from '~/services/db.server';

import type { Program } from '.prisma/client';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const year = url.searchParams.get('year') ?? DateTime.now().year;

  return await db.program.findMany({
    where: {
      year: +year,
    },
    orderBy: { name: 'asc' },
  });
};

export default function Programs() {
  const programs = useLoaderData<Program[]>();
  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="8xl">
          <Flex>
            <Heading size="lg" mb="0">
              Programas
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
        <Container maxW="8xl">
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
                    NOMBRE
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    ASISTENCIAS
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    CUPOS
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    PARTICIPANTES
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    EDAD
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {programs.map((program) => (
                  <Tr key={program.id}>
                    <Td whiteSpace="nowrap">
                      <ChakraLink
                        as={Link}
                        to={`${program.id}`}
                        fontWeight="medium"
                      >
                        {program.name}
                      </ChakraLink>
                    </Td>
                    <Td>asistencias 20%</Td>
                    <Td>{program.seats}</Td>
                    <Td>20 / 0</Td>
                    <Td>
                      {program.ageFrom} a {program.ageTo} años
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
