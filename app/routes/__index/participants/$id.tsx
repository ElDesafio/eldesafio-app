import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { Outlet, useLoaderData, useLocation, useResolvedPath } from 'remix';
import { z } from 'zod';

import { TabLink } from '~/components/TabLink';
import { db } from '~/services/db.server';

import type { Prisma } from '.prisma/client';

export async function getParticipant(id: number) {
  return await db.participant.findUnique({
    where: { id: +id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
}

export type GetParticipant = Prisma.PromiseReturnType<typeof getParticipant>;

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  return await getParticipant(+id);
};

export default function Participant() {
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
          <Stack direction="row" spacing="4" overflowY="auto">
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
                location.pathname.includes(useResolvedPath('health').pathname)
                  ? 'page'
                  : undefined
              }
            >
              Datos Médicos
            </TabLink>
            <TabLink
              to="diary"
              aria-current={
                location.pathname.includes(useResolvedPath('diary').pathname)
                  ? 'page'
                  : undefined
              }
            >
              Diario
            </TabLink>
            <TabLink
              to="biography"
              aria-current={
                location.pathname.includes(
                  useResolvedPath('biography').pathname,
                )
                  ? 'page'
                  : undefined
              }
            >
              Biografía
            </TabLink>
            <TabLink
              to="questionnaire"
              aria-current={
                location.pathname.includes(
                  useResolvedPath('questionnaire').pathname,
                )
                  ? 'page'
                  : undefined
              }
            >
              Cuestionario
            </TabLink>
            <TabLink
              to="family"
              aria-current={
                location.pathname.includes(useResolvedPath('family').pathname)
                  ? 'page'
                  : undefined
              }
            >
              Familiares
            </TabLink>
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
