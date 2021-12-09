import { Participant } from ".prisma/client";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { HiCloudUpload } from "react-icons/hi";
import { useLoaderData } from "remix";
import { z } from "zod";
import { db } from "~/services/db.server";
import { getAge, getFormattedDate } from "~/util/utils";
import styles from "~/css/participant-general.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export const loader: LoaderFunction = ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participant = db.participant.findUnique({ where: { id: +id } });

  return participant;
};

export default function ParticipantGeneral() {
  const participant = useLoaderData<Participant>();

  return (
    <>
      <Heading as="h3" size="md">
        Datos Personales
      </Heading>
      <Divider mt="2" mb="8" />
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={6}
        justifyContent="space-between"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 0, md: 6 }}
          justifyContent="space-between"
          flex="1"
          order={{ base: 2, lg: 1 }}
        >
          <Table
            className="participant-general-table"
            variant="simple"
            size="sm"
          >
            <Tbody>
              <Tr>
                <Td width="" fontWeight="600">
                  Fecha de nacimiento:
                </Td>
                <Td>{getFormattedDate(participant.birthday)}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Edad:</Td>
                <Td>{getAge(participant.birthday)}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Sexo:</Td>
                <Td>{participant.sex}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">DNI:</Td>
                <Td>{participant.dni}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Email:</Td>
                <Td>{participant.email}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Table
            className="participant-general-table"
            variant="simple"
            size="sm"
          >
            <Tbody>
              <Tr>
                <Td fontWeight="600">Dirección:</Td>
                <Td>{participant.address}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Barrio:</Td>
                <Td>{participant.neighborhood}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Ciudad:</Td>
                <Td>{participant.city}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Teléfono 1:</Td>
                <Td>
                  {participant.phone1} {participant.phone1HasWhatsapp} (
                  {participant.phone1BelongsTo})
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="600">Teléfono 2:</Td>
                <Td>
                  {participant.phone2} {participant.phone2HasWhatsapp} (
                  {participant.phone2BelongsTo})
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Stack>
        <Stack
          direction={{ base: "row", lg: "column" }}
          spacing="6"
          align="center"
          order={{ base: 1, lg: 2 }}
        >
          <Avatar size="2xl" src={participant.picture || undefined} />
          <Box>
            <HStack spacing="5">
              <Button>{participant.active ? "Activo" : "Inactivo"}</Button>
            </HStack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
