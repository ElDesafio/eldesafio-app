import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
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

import type { School } from '.prisma/client';

export const loader: LoaderFunction = async () => {
  return await db.school.findMany();
};

export default function Programs() {
  const schools = useLoaderData<School[]>();
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
              Escuelas
            </Heading>
            <Spacer />
            <Link to="new">
              <Button leftIcon={<MdAdd />} colorScheme="blue">
                Nueva
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
                    DIRECCIÓN
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    TELÉFONO
                  </Th>
                  <Th whiteSpace="nowrap" scope="col" />
                </Tr>
              </Thead>
              <Tbody>
                {schools.map((school) => (
                  <Tr key={school.id}>
                    <Td whiteSpace="nowrap">{school.name}</Td>
                    <Td>
                      {school.address} ({school.city})
                    </Td>
                    <Td>{school.phone}</Td>
                    <Td textAlign="right">
                      <Link to={`${school.id}/edit`}>
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
