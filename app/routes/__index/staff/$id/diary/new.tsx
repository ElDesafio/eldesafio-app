import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { DateTime } from 'luxon';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import {
  UserDiaryEventForm,
  userDiaryEventFormValidator,
} from '~/components/Users/UserDiaryEventForm';
import { db } from '~/services/db.server';
import { getLoggedInUser, getUserPrograms } from '~/services/users.service';
import { getSelectedYearFromRequest, useSelectedYear } from '~/util/utils';

// LOADER
export async function loader({ params, request }: LoaderArgs) {
  const { id } = z.object({ id: zfd.numeric() }).parse(params);
  const selectedYear = getSelectedYearFromRequest(request);

  const programs = await getUserPrograms({ userId: id, year: selectedYear });

  return json({ programs });
}

// ACTION
export async function action({ request, params }: ActionArgs) {
  const user = await getLoggedInUser(request);

  const { id: userId } = z.object({ id: zfd.numeric() }).parse(params);

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await userDiaryEventFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { programs, ...rest } = fieldValues.data;

  const programsArray =
    typeof programs === 'string'
      ? programs.split(',').map((id) => ({
          programId: Number(id),
        }))
      : [];

  await db.userDiary.create({
    data: {
      ...rest,
      date: DateTime.fromISO(rest.date, { zone: user.timezone }).toJSDate(),
      userId,
      createdBy: user.id,
      updatedBy: user.id,
      programs: {
        create: programsArray,
      },
    },
  });

  return redirect(`/staff/${userId}/diary`);
}

export default function NewUserDiary() {
  const { programs } = useLoaderData<typeof loader>();

  const selectedYear = useSelectedYear();

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="0"
        pb="4"
        shadow="sm"
      >
        <Container maxW="8xl">
          <Heading size="md" mb="0">
            Crear Evento
          </Heading>
        </Container>
      </Box>
      <Box as="main" py="0" flex="1">
        <UserDiaryEventForm programs={programs} key={selectedYear} />
      </Box>
    </>
  );
}
