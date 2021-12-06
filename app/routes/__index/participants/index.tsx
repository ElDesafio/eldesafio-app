import { Participant } from ".prisma/client";
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
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { TabLink } from "~/components/TabLink";
import { db } from "~/services/db.server";
import { DateTime } from "luxon";

export const loader: LoaderFunction = async () => {
  const participants = await db.participant.findMany();
  const now = new Date();
  // const birth = new Date("1981-12-06");
  console.log(DateTime.fromISO("1981-12-06").toString());
  console.log(DateTime.now().toString());
  return participants;
};

export default function Participants() {
  const participants = useLoaderData<Participant[]>();
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
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
            bg={useColorModeValue("white", "gray.700")}
            p="6"
            rounded="lg"
            shadow="base"
            overflowX="auto"
          >
            <Table my="8" borderWidth="1px" fontSize="sm">
              <Thead bg={useColorModeValue("gray.50", "gray.800")}>
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
                  <Th whiteSpace="nowrap" scope="col"></Th>
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
                            name={`${participant.firstName} ${participant.lastName}`}
                            src={participant.picture || undefined}
                          />
                        </Box>
                        <Box>
                          <Box fontSize="sm" fontWeight="medium">
                            {participant.firstName} {participant.lastName}
                          </Box>
                          <Box fontSize="sm" color="gray.500">
                            cambiareste@correo.com
                          </Box>
                        </Box>
                      </Stack>
                    </Td>
                    <Td>
                      {Math.floor(
                        DateTime.now().diff(
                          DateTime.fromISO(participant.birthday),
                          ["years"]
                        ).years
                      )}{" "}
                      años
                    </Td>
                    <Td>{participant.dni}</Td>
                    <Td textAlign="right">
                      <Button variant="link" colorScheme="blue">
                        Edit
                      </Button>
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
