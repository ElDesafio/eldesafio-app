import { Participant } from ".prisma/client";
import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { Outlet, useLoaderData } from "remix";
import { z } from "zod";
import { TabLink } from "~/components/TabLink";
import { db } from "~/services/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participant = await db.participant.findUnique({
    where: { id: +id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return participant;
};

export default function Participants() {
  const participant =
    useLoaderData<Pick<Participant, "id" | "firstName" | "lastName">>();
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} pt="8" shadow="sm">
        <Container maxW="7xl">
          <Heading size="lg" mb="3">
            {participant.firstName} {participant.lastName}
          </Heading>
          <Stack direction="row" spacing="4">
            <TabLink aria-current="page" href="#">
              General
            </TabLink>
            <TabLink href="#">Datos Médicos</TabLink>
            <TabLink href="#">Diario</TabLink>
            <TabLink href="#">Biografía</TabLink>
            <TabLink href="#">Cuestionario</TabLink>
            <TabLink href="#">Familiares</TabLink>
          </Stack>
        </Container>
      </Box>

      <Box as="main" py="8" flex="1">
        <Container maxW="7xl">
          <Box
            bg={useColorModeValue("white", "gray.700")}
            p="6"
            rounded="lg"
            shadow="base"
          >
            <Outlet />
          </Box>
        </Container>
      </Box>
    </>
  );
}
