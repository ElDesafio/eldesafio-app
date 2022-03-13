/* eslint-disable sonarjs/no-identical-functions */
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import type { ClassAttendanceStatus } from '@prisma/client';
import { DateTime, Info } from 'luxon';
import { FaCloudRain } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import type { ActionFunction, LoaderFunction } from 'remix';
import {
  json,
  Link,
  useLoaderData,
  useSearchParams,
  useTransition,
} from 'remix';
import { z } from 'zod';

import { FormSelect } from '~/components/Form/FormSelect';
import { authenticator } from '~/services/auth.server';
import type { GetProgramClasses } from '~/services/classes.service';
import { getProgramClasses } from '~/services/classes.service';
import type { GetProgramParticipants } from '~/services/programs.service';
import { getProgramParticipants } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';
import { getAge, getAttendanceProps, isAdmin } from '~/util/utils';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);
  let authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const url = new URL(request.url);
  const month = z
    .string()
    .optional()
    .nullable()
    .parse(url.searchParams.get('month'));

  const classes = await getProgramClasses({
    programId: Number(id),
    month: month != null ? Number(month) : undefined,
  });
  if (!classes) {
    throw new Error('Class not found');
  }

  const loggedinUser = await getLoggedInUser(authUser.id);

  if (!loggedinUser) {
    throw new Error('User not found');
  }

  const participants = await getProgramParticipants({
    programId: Number(id),
    includeStatus: ['ACTIVE'],
  });

  if (!participants) {
    throw new Error('Participants not found');
  }

  const isUserAdmin = isAdmin(loggedinUser);

  return {
    classes,
    participants,
    isUserAdmin,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id: programId } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const form = await request.formData();
  const participantId = z.string().parse(form.get('participantId'));
};

function ClassDateHeader({
  date,
  isRainyDay = false,
}: {
  date: Date;
  isRainyDay: boolean;
}) {
  //! There is an issue in Prisma. It's returning it as ISO instead of Date object
  const dateLuxon = DateTime.fromISO(date as unknown as string, {
    zone: 'utc',
  }).setLocale('es-ES');

  return (
    <Box position="relative">
      {isRainyDay && (
        <Box position="absolute" fontSize="md" top="-19px" left="14px">
          <FaCloudRain />
        </Box>
      )}
      <Text mt={1} mb={1}>
        {dateLuxon.weekdayShort}
        <br />
        {dateLuxon.day} {dateLuxon.monthShort}
        <br />
        {dateLuxon.year}
      </Text>
    </Box>
  );
}
function ClassAttendanceCell({ status }: { status: ClassAttendanceStatus }) {
  return (
    <Td
      textAlign="center"
      backgroundColor={getAttendanceProps(status).backgroundColor}
      color={getAttendanceProps(status).textColor}
      fontWeight="600"
      // fontSize="md"
    >
      {getAttendanceProps(status).shortText}
    </Td>
  );
}

export default function ProgramGeneral() {
  const { classes, participants, isUserAdmin } = useLoaderData<{
    classes: GetProgramClasses;
    participants: GetProgramParticipants;
    isUserAdmin: boolean;
  }>();
  const transition = useTransition();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedMonth =
    searchParams.get('month') != null
      ? Number(searchParams.get('month'))
      : DateTime.now().month;

  if (!classes) {
    throw new Error("Class doesn't exist");
  }

  const options = Info.months('long', { locale: 'es-Es' }).map(
    (month, index) => ({
      label: month,
      value: index + 1,
    }),
  );

  options.unshift({ label: 'Todo el año', value: 0 });

  return (
    <>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing="6"
        justifyContent="space-between"
      >
        <Link to="new">
          <Button leftIcon={<MdAdd />} colorScheme="blue">
            Agregar estimulo
          </Button>
        </Link>
        <Box minWidth="200px" width="200px">
          <FormSelect
            name="months"
            instanceId="months-select"
            placeholder="Seleccionar mes..."
            defaultValue={selectedMonth}
            onChange={(newValue) => {
              if (newValue && 'label' in newValue) {
                setSearchParams({ month: newValue.value.toString() });
              }
            }}
            options={options}
          />
        </Box>
      </Stack>
      <Box mt={6} overflowX="auto" pt="10px">
        <Table borderWidth="1px" fontSize="sm" size="sm" width="auto">
          <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
            <Tr>
              <Th whiteSpace="nowrap" scope="col" minWidth="300px">
                PARTICIPANTE
              </Th>
              {classes.map((classItem) => (
                <Th
                  key={classItem.id}
                  whiteSpace="nowrap"
                  scope="col"
                  width="50px"
                  textAlign="center"
                  textTransform="initial"
                  fontWeight="400"
                  fontSize="10px"
                  lineHeight="1.2"
                  pr={1}
                  pl={1}
                >
                  <ClassDateHeader
                    date={classItem.date}
                    isRainyDay={classItem.isRainyDay}
                  />
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {participants.map((attendant) => (
              <Tr key={attendant.participantId}>
                <Td whiteSpace="nowrap">
                  <Stack direction="row" spacing="4" align="center">
                    <Box flexShrink={0}>
                      <Avatar size="sm" src={attendant.picture || undefined} />
                    </Box>
                    <Box>
                      <Box fontSize="sm" fontWeight="medium">
                        <Link to={`/participants/${attendant.participantId}`}>
                          {attendant.firstName} {attendant.lastName}
                        </Link>
                      </Box>
                      <Box fontSize="sm" color="gray.500">
                        {getAge(attendant.birthday)}
                      </Box>
                    </Box>
                  </Stack>
                </Td>
                {classes.map((classItem) => (
                  <ClassAttendanceCell
                    key={classItem.id}
                    status={
                      classItem.participants.filter(
                        (p) => p.participantId === attendant.participantId,
                      )[0].status
                    }
                  />
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
