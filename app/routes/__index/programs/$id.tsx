import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import type { LoaderFunction } from 'remix';
import { Outlet, useLoaderData, useLocation, useResolvedPath } from 'remix';
import { z } from 'zod';

import { TabLink } from '~/components/TabLink';
import type { GetProgram } from '~/services/programs.service';
import { getProgram } from '~/services/programs.service';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  return await getProgram({ id: +id });
};

export default function Program() {
  const program = useLoaderData<GetProgram>();
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
                location.pathname.match(/^\/programs\/.+\/edit.*$/)
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
            <TabLink
              to="results"
              aria-current={
                location.pathname.includes(useResolvedPath('results').pathname)
                  ? 'page'
                  : undefined
              }
            >
              Resultados
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
