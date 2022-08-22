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
import type { School } from '@prisma/client';
import { Link, useLoaderData } from '@remix-run/react';
import { MdAdd } from 'react-icons/md';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { db } from '~/services/db.server';

export const loader = async () => {
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
            <LinkED to="new">
              <Button leftIcon={<MdAdd />} colorScheme="blue">
                Nueva
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
            {schools.length > 0 ? (
              <Box border="1px solid" borderColor="gray.100" borderRadius="lg">
                <Table fontSize="sm">
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
                    </Tr>
                  </Thead>
                  <Tbody>
                    {schools.map((school) => (
                      <Tr key={school.id}>
                        <Td whiteSpace="nowrap">
                          <ChakraLink as={Link} to={`${school.id}`}>
                            {school.name}
                          </ChakraLink>
                        </Td>
                        <Td>
                          {school.address} ({school.city})
                        </Td>
                        <Td>{school.phone}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <AlertED title="Vacío" description="No hay escuelas" />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
