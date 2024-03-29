import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Outlet,
  useCatch,
  useLoaderData,
  useLocation,
  useResolvedPath,
} from '@remix-run/react';
import { z } from 'zod';

import { ErrorCaught } from '~/components/ErrorCaught';
import { TabLink } from '~/components/TabLink';
import { getProgram } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';

export async function loader({ request, params }: LoaderArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const program = await getProgram({ id: +id });

  if (!program) {
    throw new Response('El programa no existe', {
      status: 404,
      statusText: 'El programa no existe',
    });
  }

  return json({ program });
}

export default function Program() {
  const { program } = useLoaderData<typeof loader>();
  const location = useLocation();

  if (!program) throw new Error("Participant doesn't exist");

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} shadow="sm">
        <Container maxW="8xl">
          <Heading size="lg" pt="4" pb="0">
            {program.name}
          </Heading>
          <Stack direction="row" spacing="4" overflowY="auto">
            <TabLink
              to={useResolvedPath('').pathname}
              aria-current={
                location.pathname.match(/^\/programs\/\d+$/) ||
                location.pathname.match(/^\/programs\/edit.*$/)
                  ? 'page'
                  : undefined
              }
            >
              General
            </TabLink>
            <TabLink
              to="attendance"
              aria-current={
                location.pathname.includes(
                  useResolvedPath('attendance').pathname,
                )
                  ? 'page'
                  : undefined
              }
            >
              Asistencias
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

export function CatchBoundary() {
  const caught = useCatch();

  return <ErrorCaught caught={caught} />;
}
