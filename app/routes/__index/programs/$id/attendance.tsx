/* eslint-disable sonarjs/no-identical-functions */
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Switch,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import type { ClassAttendanceStatus } from '@prisma/client';
import { ParticipantsOnProgramsStatus } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { useSearchParams, useTransition } from '@remix-run/react';
import { Select } from 'chakra-react-select';
import { DateTime, Info } from 'luxon';
import { FaCloudRain } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { getProgramClasses } from '~/services/classes.service';
import { getProgramParticipants } from '~/services/programs.service';
import { getLoggedInUser } from '~/services/users.service';
import { getAge, getAttendanceProps } from '~/util/utils';

import { AttendanceChartBars } from './components/AttendanceChartBars';

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function loader({ request, params }: LoaderArgs) {
  const { id } = z.object({ id: z.string() }).parse(params);

  const url = new URL(request.url);

  const includeSearchParam = url.searchParams
    .getAll('include')
    .map(
      (status) =>
        ParticipantsOnProgramsStatus[
          status as keyof typeof ParticipantsOnProgramsStatus
        ],
    );

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

  const loggedinUser = await getLoggedInUser(request);

  const participants = await getProgramParticipants({
    programId: Number(id),
    includeStatus:
      includeSearchParam.length > 0 ? includeSearchParam : ['ACTIVE'],
  });

  const activeParticipants = await getProgramParticipants({
    programId: Number(id),
    includeStatus: ['ACTIVE'],
  });

  const activeParticipantsCount = activeParticipants.length;

  if (!participants) {
    throw new Error('Participants not found');
  }

  const isUserAdmin = loggedinUser.isAdmin;

  const totalPercentageHelper: Record<
    string,
    { present: number; absent: number; total: 0 }
  > = {};

  classes.forEach((c) => {
    c.participants.forEach((p) => {
      if (!totalPercentageHelper[p.participantId]) {
        totalPercentageHelper[p.participantId] = {
          present: 0,
          absent: 0,
          total: 0,
        };
      }
      if (p.status === 'PRESENT' || p.status === 'LATE') {
        totalPercentageHelper[p.participantId].present++;
        totalPercentageHelper[p.participantId].total++;
      }
      if (p.status === 'ABSENT' || p.status === 'EXCUSED') {
        totalPercentageHelper[p.participantId].absent++;
        totalPercentageHelper[p.participantId].total++;
      }
    });
  });

  const totalPercentages: Record<string, { present: number; absent: number }> =
    {};

  Object.keys(totalPercentageHelper).forEach((k) => {
    const { present, absent, total } = totalPercentageHelper[k];

    totalPercentages[k] = {
      present: Math.ceil((present / total) * 100),
      absent: Math.ceil((absent / total) * 100),
    };
  });

  return typedjson({
    classes,
    participants,
    totalPercentages,
    isUserAdmin,
    activeParticipantsCount,
  });
}

function ClassDateHeader({
  classId,
  date,
  isRainyDay = false,
}: {
  classId: number;
  date: Date;
  isRainyDay: boolean;
}) {
  //! There is an issue in Prisma. It's returning it as ISO instead of Date object
  const dateLuxon = DateTime.fromISO(date as unknown as string, {
    zone: 'utc',
  }).setLocale('es-ES');

  const [searchParams] = useSearchParams();

  const selectedMonth = searchParams.get('month');

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
      <LinkED
        to={`${classId}/edit${
          selectedMonth != null ? `?month=${selectedMonth}` : ''
        } `}
      >
        <Button variant="solid" colorScheme="gray" size="xs" pr={1} pl={1}>
          Editar
        </Button>
      </LinkED>
    </Box>
  );
}
function ClassAttendanceCell({ status }: { status: ClassAttendanceStatus }) {
  if (!status) {
    return <Td />;
  }
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

export default function Attendance() {
  const {
    classes,
    participants,
    isUserAdmin,
    totalPercentages,
    activeParticipantsCount,
  } = useTypedLoaderData<typeof loader>();
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
        <LinkED to="new">
          <Tooltip
            hasArrow
            placement="top"
            label="No hay participantes activos"
            isDisabled={activeParticipantsCount > 0}
            shouldWrapChildren
          >
            <Button
              leftIcon={<MdAdd />}
              colorScheme="blue"
              disabled={activeParticipantsCount === 0}
            >
              Agregar estimulo
            </Button>
          </Tooltip>
        </LinkED>
        <HStack spacing={6}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="show-inactives" mb="0">
              Mostrar inactivos
            </FormLabel>
            <Switch
              id="show-inactives"
              isChecked={searchParams.getAll('include').includes('INACTIVE')}
              onChange={(event) => {
                let includeArray = searchParams.getAll('include');
                if (event.target.checked) {
                  includeArray.push('INACTIVE');
                  includeArray.push('ACTIVE');
                  includeArray = [...new Set(includeArray)];
                  searchParams.delete('include');
                  includeArray.forEach((i) =>
                    searchParams.append('include', i),
                  );
                }
                if (!event.target.checked) {
                  includeArray = [
                    ...new Set(includeArray.filter((i) => i !== 'INACTIVE')),
                  ];
                  searchParams.delete('include');
                  includeArray.forEach((i) =>
                    searchParams.append('include', i),
                  );
                }
                setSearchParams(searchParams);
              }}
            />
          </FormControl>
          <Box minWidth="200px" width="200px">
            <Select
              name="months"
              instanceId="months-select"
              placeholder="Seleccionar mes..."
              value={options[selectedMonth]}
              onChange={(newValue) => {
                if (newValue && 'label' in newValue) {
                  searchParams.set('month', newValue.value.toString());
                  setSearchParams(searchParams);
                }
              }}
              options={options}
              chakraStyles={{
                dropdownIndicator: (provided) => ({
                  ...provided,
                  bg: 'transparent',
                  px: 2,
                  cursor: 'inherit',
                }),
                indicatorSeparator: (provided) => ({
                  ...provided,
                  display: 'none',
                }),
              }}
            />
          </Box>
        </HStack>
      </Stack>
      <Box mt={6} overflowX="auto" pt="10px">
        {classes.length > 0 && participants.length > 0 ? (
          <Table borderWidth="1px" fontSize="sm" size="sm" width="auto">
            <TableCaption textAlign="left">
              Cantidad de participantes:{' '}
              <Text as="span" fontWeight="semibold">
                {participants.length}
              </Text>
            </TableCaption>

            <Thead bg="gray.50">
              <Tr>
                <Th whiteSpace="nowrap" scope="col" minWidth="300px">
                  PARTICIPANTE
                </Th>
                <Th whiteSpace="nowrap" scope="col">
                  Totales
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
                      classId={classItem.id}
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
                        <Tooltip
                          label="inactivo"
                          aria-label="inactivo"
                          isDisabled={
                            !(
                              attendant.status !== 'ACTIVE' &&
                              attendant.wasEverActive
                            )
                          }
                        >
                          <Avatar
                            size="sm"
                            src={attendant.picture || undefined}
                          >
                            {attendant.status !== 'ACTIVE' &&
                              attendant.wasEverActive && (
                                <AvatarBadge bg="red" boxSize="1.25em" />
                              )}
                          </Avatar>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Box fontSize="sm" fontWeight="medium">
                          <LinkED
                            to={`/participants/${attendant.participantId}`}
                          >
                            {attendant.firstName} {attendant.lastName}
                          </LinkED>
                        </Box>
                        <Box fontSize="sm" color="gray.500">
                          {getAge(attendant.birthday)}
                        </Box>
                      </Box>
                    </Stack>
                  </Td>
                  <Td textAlign="center">
                    {totalPercentages[attendant.participantId]?.present}%
                  </Td>
                  {classes.map((classItem) => (
                    <ClassAttendanceCell
                      key={classItem.id}
                      status={
                        classItem.participants.filter(
                          (p) => p.participantId === attendant.participantId,
                        )[0]?.status
                      }
                    />
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <AlertED
            title="Vacío"
            description="No hay clases o alumnos para el filtro seleccionado."
          />
        )}
      </Box>
      {classes.length > 0 && participants.length > 0 && (
        <>
          <Heading as="h3" size="md" mt={8}>
            Gráfico anual
          </Heading>
          <Divider mt={2} mb={8} />

          <Box>
            <AttendanceChartBars />
          </Box>
        </>
      )}
    </>
  );
}
