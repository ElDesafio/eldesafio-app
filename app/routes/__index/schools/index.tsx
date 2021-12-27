import { Participant, Program } from ".prisma/client";
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
import { db } from "~/services/db.server";
import { getAge } from "~/util/utils";

export const loader: LoaderFunction = async () => {
  const programs = await db.program.findMany();
  return programs;
};

export default function Programs() {
  const programs = useLoaderData<Program[]>();
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
        <Container maxW="7xl">
          <Box
            bg={useColorModeValue("white", "gray.700")}
            p="6"
            rounded="lg"
            shadow="base"
            overflowX="auto"
          >
            <Table borderWidth="1px" fontSize="sm">
              <Thead bg={useColorModeValue("gray.50", "gray.800")}>
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
                  <Th whiteSpace="nowrap" scope="col"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {programs.map((program) => (
                  <Tr key={program.id}>
                    <Td whiteSpace="nowrap">{program.name}</Td>
                    <Td>asistencias 20%</Td>
                    <Td>{program.seats}</Td>
                    <Td>20 / 0</Td>
                    <Td>
                      {program.ageFrom} a {program.ageTo} años
                    </Td>
                    <Td textAlign="right">
                      <Link to={`${program.id}/edit`}>
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
