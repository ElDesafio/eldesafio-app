import {
  Avatar,
  Box,
  Button,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { ClassAttendanceStatus } from '@prisma/client';
import { Link, useNavigate, useTransition } from 'remix';
import { ValidatedForm, withZod } from 'remix-validated-form';
import * as z from 'zod';

import { FormCheckbox } from '~/components/Form/FormCheckbox';
import { FormInput } from '~/components/Form/FormInput';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';
import type { GetProgramParticipants } from '~/services/programs.service';
import { getAge, schemaCheckbox } from '~/util/utils';

import { AlertED } from '../AlertED';
import { FormRadioAttendance } from '../Form/FormRadioAttendance';

const attendanceSchema = z.object({
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
  attendants: GetProgramParticipants;
};

export function AttendanceForm({
  defaultValues,
  attendants,
}: AttendanceFormProps) {
  let navigate = useNavigate();

  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  if (!attendants) {
    return <AlertED description="No hay participantes en la clase" />;
  }

  return (
    <ValidatedForm
      validator={attendanceFormValidator}
      defaultValues={defaultValues}
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
                      <Avatar src={attendant.picture || undefined} />
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
                    defaultValue={attendant.participantId}
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
    </ValidatedForm>
  );
}
