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
  useLoaderData,
  useLocation,
  useResolvedPath,
} from '@remix-run/react';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { TabLink } from '~/components/TabLink';
import { db } from '~/services/db.server';
import { getLoggedInUser } from '~/services/users.service';

export async function getUser(id: number) {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
}

export async function loader({ request, params }: LoaderArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: zfd.numeric() }).parse(params);

  const user = await getUser(+id);

  return json({ user });
}

export default function User() {
  const { user } = useLoaderData<typeof loader>();
  const location = useLocation();

  if (!user) throw new Error("User doesn't exist");

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} shadow="sm">
        <Container maxW="8xl">
          <Heading size="lg" pt="4" pb="0">
            {user.firstName} {user.lastName}
          </Heading>
          <Stack direction="row" spacing="4" overflowY="auto">
            <TabLink
              to={useResolvedPath('').pathname}
              aria-current={
                location.pathname.match(/^\/staff\/\d+$/) ||
                location.pathname.match(/^\/staff\/.+\/edit.*$/)
                  ? 'page'
                  : undefined
              }
            >
              General
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
