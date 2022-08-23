import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import type { Prisma } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Outlet,
  useLoaderData,
  useLocation,
  useResolvedPath,
} from '@remix-run/react';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { TabLink } from '~/components/TabLink';
import { db } from '~/services/db.server';

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

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = z.object({ id: zfd.numeric() }).parse(params);

  const participant = await getParticipant(+id);

  return json({ participant });
};

export default function Participant() {
  const { participant } = useLoaderData<typeof loader>();
  const location = useLocation();

  if (!participant) throw new Error("Participant doesn't exist");

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} shadow="sm">
        <Container maxW="8xl">
          <Heading size="lg" pt="4" pb="0">
            {participant.firstName} {participant.lastName}
          </Heading>
          <Stack direction="row" spacing="4" overflowY="auto">
            <TabLink
              to={useResolvedPath('').pathname}
              aria-current={
                location.pathname.match(/^\/participants\/\d+$/) ||
                location.pathname.match(/^\/participants\/.+\/edit.*$/)
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
              to="bio-survey"
              aria-current={
                location.pathname.includes(
                  useResolvedPath('bio-survey').pathname,
                )
                  ? 'page'
                  : undefined
              }
            >
              Cuestionario
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
        <Container maxW="8xl">
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
