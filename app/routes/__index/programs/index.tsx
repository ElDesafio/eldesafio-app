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
import type { Program } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdAdd } from 'react-icons/md';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { db } from '~/services/db.server';
import { getSelectedYearFromRequest } from '~/util/utils';

export const loader = async ({ request }: LoaderArgs) => {
  const year = getSelectedYearFromRequest(request);

  return await db.program.findMany({
    where: {
      year,
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
            <LinkED to="new">
              <Button leftIcon={<MdAdd />} colorScheme="blue">
                Nuevo
              </Button>
            </LinkED>
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
            {programs.length > 0 ? (
              <Box border="1px solid" borderColor="gray.100" borderRadius="lg">
                <Table fontSize="sm">
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
                            as={LinkED}
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
            ) : (
              <AlertED
                title="Vacío"
                description="No hay programas para el año seleccionado"
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
