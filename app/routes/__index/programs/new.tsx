import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { UserDiaryType } from '@prisma/client';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { DateTime } from 'luxon';
import { validationError } from 'remix-validated-form';

import {
  ProgramForm,
  programFormValidator,
} from '~/components/Program/ProgramForm';
import { db } from '~/services/db.server';
import {
  getFacilitators,
  getLoggedInUser,
  getVolunteers,
} from '~/services/users.service';

// LOADER
export async function loader({ request }: LoaderArgs) {
  await getLoggedInUser(request);

  const facilitators = await getFacilitators({});
  const volunteers = await getVolunteers({});

  return json({ facilitators, volunteers });
}

// ACTION
export async function action({ request }: ActionArgs) {
  let user = await getLoggedInUser(request);

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await programFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { programDays, facilitators, volunteers, ...rest } = fieldValues.data;

  const newFacilitators =
    typeof facilitators === 'string'
      ? facilitators.split(',').map((id) => ({
          userId: Number(id),
          isFacilitator: true,
        }))
      : [];
  const newVolunteers =
    typeof volunteers === 'string'
      ? volunteers.split(',').map((id) => ({
          userId: Number(id),
          isFacilitator: false,
        }))
      : [];

  const program = await db.program.create({
    data: {
      ...rest,
      createdBy: user.id,
      updatedBy: user.id,
      programDays: {
        create: programDays,
      },
      educators: {
        create: [...newFacilitators, ...newVolunteers],
      },
    },
  });

  newFacilitators.forEach(async (facilitator) => {
    await db.userDiary.create({
      data: {
        userId: facilitator.userId,
        type: UserDiaryType.PROGRAM_STATUS_ACTIVE,
        isAutoEvent: true,
        title: `Dado de alta como facilitador en el programa`,
        date: DateTime.utc().toJSDate(),
        createdBy: user.id,
        updatedBy: user.id,
        programs: {
          create: {
            programId: program.id,
          },
        },
      },
    });
  });

  newVolunteers.forEach(async (volunteer) => {
    await db.userDiary.create({
      data: {
        userId: volunteer.userId,
        type: UserDiaryType.PROGRAM_STATUS_ACTIVE,
        isAutoEvent: true,
        title: `Dado de alta como voluntario en el programa`,
        date: DateTime.utc().toJSDate(),
        createdBy: user.id,
        updatedBy: user.id,
        programs: {
          create: {
            programId: program.id,
          },
        },
      },
    });
  });

  return redirect('/programs');
}

export default function NewProgram() {
  const { facilitators, volunteers } = useLoaderData<typeof loader>();

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="8xl">
          <Heading size="lg" mb="0">
            Crear Programa
          </Heading>
        </Container>
      </Box>
      <Box as="main" py="8" flex="1">
        <Container maxW="8xl" id="xxx">
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p="6"
            rounded="lg"
            shadow="base"
          >
            <ProgramForm facilitators={facilitators} volunteers={volunteers} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
