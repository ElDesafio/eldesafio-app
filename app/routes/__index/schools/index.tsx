import { School } from ".prisma/client";
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
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/services/db.server";

export const loader: LoaderFunction = async () => {
  const programs = await db.school.findMany();
  return programs;
};

export default function Programs() {
  const schools = useLoaderData<School[]>();
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
                    DIRECCIÓN
                  </Th>
                  <Th whiteSpace="nowrap" scope="col">
                    TELÉFONO
                  </Th>
                  <Th whiteSpace="nowrap" scope="col"></Th>
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