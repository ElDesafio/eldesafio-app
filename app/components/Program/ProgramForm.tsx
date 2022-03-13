import {
  Box,
  Button,
  chakra,
  HStack,
  IconButton,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { ProgramSex, Weekdays } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { useNavigate, useTransition } from 'remix';
import { ValidatedForm, withZod } from 'remix-validated-form';
import { v4 as uuid } from 'uuid';
import * as z from 'zod';

import { FieldGroup } from '~/components/FieldGroup';
import { FormCheckbox } from '~/components/Form/FormCheckbox';
import { FormInput } from '~/components/Form/FormInput';
import { FormSelect } from '~/components/Form/FormSelect';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';
import type { GetProgram } from '~/services/programs.service';
import { convertStringToNumberForZod, schemaCheckbox } from '~/util/utils';

import { FormTextArea } from '../Form/FormTextArea';

const programSchema = z.object({
  name: z.string().nonempty('Nombre no puede estar vacío'),
  year: z.preprocess(
    convertStringToNumberForZod,
    z
      .number({ required_error: 'Año no puede estar vacío' })
      .positive()
      .min(2000),
  ),
  sex: z.nativeEnum(ProgramSex, {
    errorMap: (issue) => ({
      message: 'Sexo no puede estar vacío',
    }),
  }),
  seats: z.preprocess(
    convertStringToNumberForZod,
    z
      .number({ required_error: 'Cupo no puede estar vacío' })
      .positive()
      .max(9999),
  ),
  ageFrom: z.preprocess(
    convertStringToNumberForZod,
    z
      .number({ required_error: 'Edad Desde no puede estar vacío' })
      .positive()
      .max(120),
  ),

  ageTo: z.preprocess(
    convertStringToNumberForZod,
    z
      .number({ required_error: 'Edad Hasta no puede estar vacío' })
      .positive()
      .max(120),
  ),
  ageByYear: schemaCheckbox,
  programDays: z
    .object({
      id: z.number().optional(),
      programId: z.number().optional(),
      day: z.nativeEnum(Weekdays, {
        errorMap: (issue) => ({
          message: 'Día no puede estar vacío',
        }),
      }),
      fromTime: z.string().nonempty('Hora Inicio no puede estar vacío'),
      toTime: z.string().nonempty('Hora Fin no puede estar vacío'),
    })
    .array(),
  facilitators: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable().optional(),
  ),
  volunteers: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable().optional(),
  ),
});

export const programFormValidator = withZod(programSchema);

type ProgramFormProps = {
  defaultValues?: Partial<z.infer<typeof programSchema>>;
  facilitators: Exclude<GetProgram, null>['educators'][0]['user'][];
  volunteers: Exclude<GetProgram, null>['educators'][0]['user'][];
};

export function ProgramForm({
  defaultValues,
  facilitators,
  volunteers,
}: ProgramFormProps) {
  let navigate = useNavigate();
  const [cleanFacilitators, setCleanFacilitators] = useState(facilitators);
  const [cleanVolunteers, setCleanVolunteers] = useState(volunteers);
  const [selectedFacilitatorsIds, setSelectedFacilitatorsIds] = useState(
    defaultValues?.facilitators?.split(',').map(Number) ?? [],
  );
  const [selectedVolunteersIds, setSelectedVolunteersIds] = useState(
    defaultValues?.volunteers?.split(',').map(Number) ?? [],
  );

  useEffect(() => {
    setCleanFacilitators(
      facilitators.filter((f) => !selectedVolunteersIds.includes(f.id)),
    );
    setCleanVolunteers(
      volunteers.filter((v) => !selectedFacilitatorsIds.includes(v.id)),
    );
  }, [selectedFacilitatorsIds, selectedVolunteersIds]);

  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  // If the object has no `id` we use a random id. This is only so we can use it as a key
  const [daysIds, setDaysIds] = useState<(string | number)[]>(
    defaultValues?.programDays?.length && defaultValues?.programDays?.length > 0
      ? defaultValues.programDays.map((day) => day.id || uuid())
      : [uuid()],
  );

  return (
    <Box px={{ base: '4', md: '10' }} maxWidth="7xl">
      <ValidatedForm
        validator={programFormValidator}
        defaultValues={defaultValues}
        method="post"
        noValidate
      >
        <Stack spacing="4" divider={<StackDivider />}>
          <FieldGroup title="Datos Básicos">
            <VStack width="full" spacing="6" alignItems="flex-start">
              <FormStack width="full">
                <FormInput name="name" label="Nombre" isRequired />
                <FormInput
                  name="year"
                  label="Año"
                  type="number"
                  maxWidth="100px"
                  min="2000"
                  isRequired
                />
                <FormSelect
                  instanceId="select-sex"
                  name="sex"
                  label="Sexo"
                  isRequired
                  placeholder="Seleccionar sexo"
                  options={[
                    { label: 'Mujeres', value: ProgramSex.FEMALE },
                    { label: 'Varones', value: ProgramSex.MALE },
                    { label: 'Mixto', value: ProgramSex.ALL },
                  ]}
                />
              </FormStack>
              <FormStack justifyContent="flex-start">
                <FormInput
                  name="seats"
                  label="Cupo"
                  type="number"
                  maxWidth="100px"
                  max="9999"
                  min="0"
                  isRequired
                />
                <FormInput
                  name="ageFrom"
                  label="Edad desde"
                  type="number"
                  maxWidth="120px"
                  rightElement={
                    <chakra.span
                      pointerEvents="none"
                      color="gray.500"
                      fontSize="0.8em"
                      mr={2}
                    >
                      años
                    </chakra.span>
                  }
                  isRequired
                />
                <FormInput
                  name="ageTo"
                  label="Edad hasta"
                  type="number"
                  maxWidth="120px"
                  rightElement={
                    <chakra.span
                      pointerEvents="none"
                      color="gray.500"
                      fontSize="0.8em"
                      mr={2}
                    >
                      años
                    </chakra.span>
                  }
                  isRequired
                />
                <FormCheckbox
                  name="ageByYear"
                  label="Edad x año"
                  value="true"
                  helperText="Calcular edad del programa basándose solamente en el año de nacimiento"
                >
                  Edad x año
                </FormCheckbox>
              </FormStack>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Días de clase">
            <VStack width="full" spacing="6" alignItems="flex-start">
              {daysIds.map((id, index) => (
                <FormStack width="full" key={id}>
                  <FormSelect
                    instanceId={`select-day-${id}`}
                    name={`programDays[${index}].day`}
                    label="Día"
                    isRequired
                    placeholder="Seleccionar día"
                    options={[
                      { label: 'Lunes', value: Weekdays.MONDAY },
                      { label: 'Martes', value: Weekdays.TUESDAY },
                      { label: 'Miércoles', value: Weekdays.WEDNESDAY },
                      { label: 'Jueves', value: Weekdays.THURSDAY },
                      { label: 'Viernes', value: Weekdays.FRIDAY },
                      { label: 'Sábado', value: Weekdays.SATURDAY },
                      { label: 'Domingo', value: Weekdays.SUNDAY },
                    ]}
                  />
                  <FormInput
                    name={`programDays[${index}].fromTime`}
                    label="Hora Inicio"
                    type="time"
                    isRequired
                    step="1800" // 30 min
                  />
                  <FormInput
                    name={`programDays[${index}].toTime`}
                    label="Hora Fin"
                    type="time"
                    isRequired
                    step="1800" // 30 min
                  />
                  {daysIds.length > 1 && (
                    <IconButton
                      alignSelf="flex-end"
                      variant="ghost"
                      aria-label="Delete day"
                      onClick={() =>
                        setDaysIds(
                          daysIds.filter((dayId, index2) => index2 !== index),
                        )
                      }
                      icon={<FaTrashAlt />}
                    />
                  )}
                </FormStack>
              ))}
              <Button
                leftIcon={<MdAdd />}
                colorScheme="blue"
                size="xs"
                onClick={() => setDaysIds([...daysIds, uuid()])}
              >
                Agregar día
              </Button>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Facilitadores">
            <FormStack width="full">
              <FormSelect
                instanceId="facilitators-select"
                name="facilitators"
                label="Facilitador(es)"
                isMulti
                placeholder="Seleccionar facilitador..."
                onChange={(newValue) => {
                  if (!newValue) return;

                  if (Array.isArray(newValue)) {
                    setSelectedFacilitatorsIds(newValue.map((v) => v.value));
                  }
                }}
                options={cleanFacilitators.map((facilitator) => ({
                  label: `${facilitator.firstName} ${facilitator.lastName}`,
                  value: facilitator.id,
                }))}
              />
              <FormSelect
                instanceId="volunteers-select"
                name="volunteers"
                label="Voluntario(s)"
                isMulti
                placeholder="Seleccionar voluntario..."
                onChange={(newValue) => {
                  if (!newValue) return;

                  if (Array.isArray(newValue)) {
                    setSelectedVolunteersIds(newValue.map((v) => v.value));
                  }
                }}
                options={cleanVolunteers.map((volunteer) => ({
                  label: `${volunteer.firstName} ${volunteer.lastName}`,
                  value: volunteer.id,
                }))}
              />
            </FormStack>
          </FieldGroup>

          <FieldGroup title="Resultados">
            <FormTextArea name="description" rows={5} />
          </FieldGroup>
        </Stack>
        <HStack width="full" justifyContent="center" mt="8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <FormSubmitButton isLoading={isSaving} />
        </HStack>
      </ValidatedForm>
    </Box>
  );
}
