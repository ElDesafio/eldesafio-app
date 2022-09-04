import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Spacer,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdAdd } from 'react-icons/md';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { db } from '~/services/db.server';
import { getAge } from '~/util/utils';

export async function loader() {
  const participants = await db.participant.findMany({
    orderBy: { firstName: 'asc' },
  });

  return json({ participants });
}

export default function Participants() {
  const { participants } = useLoaderData<typeof loader>();
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
              Participantes
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
            {participants.length > 0 ? (
              <Box border="1px solid" borderColor="gray.100" borderRadius="lg">
                <Table fontSize="sm">
                  <TableCaption alignItems="center" my={2}>
                    Cantidad de participantes:{' '}
                    <Text as="span" fontWeight="semibold">
                      {participants.length}
                    </Text>
                  </TableCaption>

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
                                // showBorder
                                // borderColor="red"
                              />
                            </Box>
                            <Box>
                              <Box fontSize="sm" fontWeight="medium">
                                <ChakraLink
                                  as={LinkED}
                                  to={`/participants/${participant.id}`}
                                >
                                  {participant.firstName} {participant.lastName}
                                </ChakraLink>
                              </Box>
                              <Box fontSize="sm" color="gray.500">
                                {participant.email}
                              </Box>
                            </Box>
                          </Stack>
                        </Td>
                        <Td>{getAge(participant.birthday)}</Td>
                        <Td>{participant.dni}</Td>
                        <Td textAlign="right">
                          <LinkED to={`${participant.id}/edit`}>
                            <Button variant="link" colorScheme="blue">
                              Edit
                            </Button>
                          </LinkED>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <AlertED
                title="Vacío"
                description="No hay participantes para el año seleccionado"
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
