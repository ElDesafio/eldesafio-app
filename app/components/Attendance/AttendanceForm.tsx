import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { ClassAttendanceStatus } from '@prisma/client';
import { withZod } from '@remix-validated-form/with-zod';
import { Link, useNavigate, useSearchParams, useTransition } from 'remix';
import { ValidatedForm } from 'remix-validated-form';
import * as z from 'zod';

import { FormCheckbox } from '~/components/Form/FormCheckbox';
import { FormInput } from '~/components/Form/FormInput';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';
import type { GetClass } from '~/services/classes.service';
import type { GetProgramParticipants } from '~/services/programs.service';
import { getAge, schemaCheckbox } from '~/util/utils';

import { AlertED } from '../AlertED';
import { FormRadioAttendance } from '../Form/FormRadioAttendance';

export const attendanceSchema = z.object({
  date: z.string().nonempty('Fecha no puede estar vacía'),
  isRainyDay: schemaCheckbox,
  attendants: z
    .object({
      participantId: z
        .string()
        .nonempty('Participante ID no puede estar vacío'),
      status: z.preprocess(
        (value) => (value === '' ? null : value),
        z.nativeEnum(ClassAttendanceStatus).nullable().optional(),
      ),
    })
    .array(),
});

export const attendanceFormValidator = withZod(attendanceSchema);

type AttendanceFormProps = {
  defaultValues?: Partial<z.infer<typeof attendanceSchema>>;
  attendants:
    | GetProgramParticipants
    | Exclude<GetClass, undefined>['attendants'];
};

export function AttendanceForm({
  defaultValues,
  attendants,
}: AttendanceFormProps) {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedMonth = searchParams.get('month');

  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  if (!attendants) {
    return <AlertED description="No hay participantes en la clase" />;
  }

  return (
    <ValidatedForm
      validator={attendanceFormValidator}
      defaultValues={defaultValues}
      action={`?month=${selectedMonth}`}
      method="post"
      noValidate
    >
      <FormStack width="full" maxWidth="500px" spacing={8}>
        <FormInput name="date" label="Fecha" type="date" isRequired />
        <FormCheckbox
          name="isRainyDay"
          label="Clima"
          alignSelf="center"
          justifySelf="center"
          value="true"
        >
          Día de lluvia
        </FormCheckbox>
      </FormStack>

      <Box mt={8} overflowX="auto">
        <Table borderWidth="0" size="sm" width="auto">
          <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
            <Tr>
              <Th whiteSpace="nowrap" scope="col" minWidth="300px">
                PARTICIPANTE
              </Th>
              <Th
                whiteSpace="nowrap"
                scope="col"
                width="50px"
                textAlign="center"
                pr={1}
                pl={1}
              >
                Asistencia
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendants.map((attendant, index) => (
              <Tr key={attendant.participantId}>
                <Td whiteSpace="nowrap">
                  <Stack direction="row" spacing="4" align="center">
                    <Box flexShrink={0}>
                      <Tooltip
                        label="inactivo"
                        aria-label="inactivo"
                        isDisabled={
                          !(
                            attendant.programStatus !== 'ACTIVE' &&
                            attendant.wasEverActive
                          )
                        }
                      >
                        <Avatar src={attendant.picture || undefined}>
                          {attendant.programStatus !== 'ACTIVE' &&
                            attendant.wasEverActive && (
                              <AvatarBadge bg="red" boxSize="1.25em" />
                            )}
                        </Avatar>
                      </Tooltip>
                    </Box>
                    <Box>
                      <Box fontWeight="medium">
                        <Link to={`/participants/${attendant.participantId}`}>
                          {attendant.firstName} {attendant.lastName}
                        </Link>
                      </Box>
                      <Box color="gray.500">{getAge(attendant.birthday)}</Box>
                    </Box>
                  </Stack>
                </Td>
                <Td>
                  <FormInput
                    name={`attendants[${index}].participantId`}
                    hidden
                    value={attendant.participantId}
                  />
                  <FormRadioAttendance name={`attendants[${index}].status`} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <HStack width="full" justifyContent="center" mt="8">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
        <FormSubmitButton isLoading={isSaving} />
      </HStack>
      <FormInput
        name="selectedMonth"
        hidden
        value={selectedMonth ?? undefined}
      />
    </ValidatedForm>
  );
}
