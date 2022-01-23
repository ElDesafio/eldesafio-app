import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { LoaderFunction } from '@remix-run/server-runtime';
import { Outlet, useLoaderData, useLocation, useResolvedPath } from 'remix';
import { z } from 'zod';

import { TabLink } from '~/components/TabLink';
import { db } from '~/services/db.server';

import { Prisma } from '.prisma/client';

async function getParticipant(id: number) {
  const participant = await db.participant.findUnique({
    where: { id: +id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
  return participant;
}

export type GetParticipant = Prisma.PromiseReturnType<typeof getParticipant>;

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participant = await getParticipant(+id);

  return participant;
};

export default function Participants() {
  const participant = useLoaderData<GetParticipant>();
  const location = useLocation();

  if (!participant) throw new Error("Participant doesn't exist");

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} pt="8" shadow="sm">
        <Container maxW="7xl">
          <Heading size="lg" mb="3">
            {participant.firstName} {participant.lastName}
          </Heading>
          <Stack direction="row" spacing="4">
            <TabLink
              to={useResolvedPath('').pathname}
              aria-current={
                location.pathname === useResolvedPath('').pathname
                  ? 'page'
                  : undefined
              }
            >
              General
            </TabLink>
            <TabLink
              to="programs"
              aria-current={
                location.pathname === useResolvedPath('programs').pathname
                  ? 'page'
                  : undefined
              }
            >
              Programas
            </TabLink>
            <TabLink
              to="health"
              aria-current={
                location.pathname === useResolvedPath('health').pathname
                  ? 'page'
                  : undefined
              }
            >
              Datos Médicos
            </TabLink>
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
            bg={useColorModeValue('white', 'gray.700')}
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
