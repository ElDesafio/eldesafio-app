import {
  Box,
  Button,
  Stack,
  useColorModeValue,
  HStack,
  StackDivider,
  VStack,
  Container,
  IconButton,
} from "@chakra-ui/react";
import { FieldGroup } from "~/components/FieldGroup";

import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/Form/FormInput";
import { FormSubmitButton } from "~/components/Form/FormSubmitButton";
import * as z from "zod";
import { FormStack } from "~/components/Form/FormStack";
import { FormSelect } from "~/components/Form/FormSelect";
import { ProgramSex, Weekdays } from ".prisma/client";
import { FormCheckbox } from "~/components/Form/FormCheckbox";
import { FormTextArea } from "../Form/FormTextArea";
import { useNavigate } from "remix";
import { schemaCheckbox, withZodArray } from "~/util/utils";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const programSchema = z.object({
  name: z.string().nonempty("Nombre no puede estar vacío"),
  year: z.preprocess(
    (value) =>
      typeof value === "string" && value.length > 0
        ? parseInt(value)
        : undefined,
    z
      .number({ required_error: "Año no puede estar vacío" })
      .positive()
      .min(2000)
  ),
  sex: z.nativeEnum(ProgramSex, {
    errorMap: (issue) => ({
      message: "Sexo no puede estar vacío",
    }),
  }),
  seats: z.preprocess(
    (value) =>
      typeof value === "string" && value.length > 0
        ? parseInt(value)
        : undefined,
    z
      .number({ required_error: "Cupo no puede estar vacío" })
      .positive()
      .max(9999)
  ),
  ageFrom: z.preprocess(
    (value) =>
      typeof value === "string" && value.length > 0
        ? parseInt(value)
        : undefined,
    z
      .number({ required_error: "Edad Desde no puede estar vacío" })
      .positive()
      .max(120)
  ),

  ageTo: z.preprocess(
    (value) =>
      typeof value === "string" && value.length > 0
        ? parseInt(value)
        : undefined,
    z
      .number({ required_error: "Edad Hasta no puede estar vacío" })
      .positive()
      .max(120)
  ),

  ageByYear: schemaCheckbox,
  programDays: z
    .object({
      day: z.nativeEnum(Weekdays, {
        errorMap: (issue) => ({
          message: "Día no puede estar vacío",
        }),
      }),
      fromTime: z.string().nonempty("Hora Inicio no puede estar vacío"),
      toTime: z.string().nonempty("Hora Fin no puede estar vacío"),
    })
    .array(),
});

export const programFormValidator = withZodArray(programSchema);

export function ProgramForm({
  defaultValues,
}: {
  defaultValues?: Partial<z.infer<typeof programSchema>>;
}) {
  let navigate = useNavigate();

  // If the object has no `id` we use a random id. This is only so we can use it as a key
  const [daysIds, setDaysIds] = useState(
    defaultValues?.programDays?.length && defaultValues?.programDays?.length > 0
      ? defaultValues.programDays.map((day) => ({
          id: day.id,
        }))
      : [{ id: uuid() }]
  );

  return (
    <Box as="main" py="8" flex="1">
      <Container maxW="7xl" id="xxx">
        <Box
          bg={useColorModeValue("white", "gray.700")}
          p="6"
          rounded="lg"
          shadow="base"
        >
          <Box px={{ base: "4", md: "10" }} maxWidth="7xl">
            <ValidatedForm
              validator={programFormValidator}
              defaultValues={defaultValues}
              method="post"
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
                        name="sex"
                        label="Sexo"
                        isRequired
                        placeholder="Seleccionar sexo"
                      >
                        <option value={ProgramSex.MALE}>Varones</option>
                        <option value={ProgramSex.FEMALE}>Mujeres</option>
                        <option value={ProgramSex.ALL}>Mixto</option>
                      </FormSelect>
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
                        rightElement={{
                          pointerEvents: "none",
                          color: "gray.500",
                          fontSize: "0.8em",
                          mr: 2,
                          children: "años",
                        }}
                        isRequired
                      />
                      <FormInput
                        name="ageTo"
                        label="Edad hasta"
                        type="number"
                        maxWidth="120px"
                        rightElement={{
                          pointerEvents: "none",
                          color: "gray.500",
                          fontSize: "0.8em",
                          mr: 2,
                          children: "años",
                        }}
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
                      <FormStack width="full" key={id.id}>
                        <FormSelect
                          name={`programDays[${id.id}][day]`}
                          label="Día"
                          isRequired
                          placeholder="Seleccionar día"
                        >
                          <option value={Weekdays.MONDAY}>Lunes</option>
                          <option value={Weekdays.TUESDAY}>Martes</option>
                          <option value={Weekdays.WEDNESDAY}>Miércoles</option>
                          <option value={Weekdays.THURSDAY}>Jueves</option>
                          <option value={Weekdays.FRIDAY}>Viernes</option>
                          <option value={Weekdays.SATURDAY}>Sábado</option>
                          <option value={Weekdays.SUNDAY}>Doming</option>
                        </FormSelect>
                        <FormInput
                          name={`programDays[${index}][fromTime]`}
                          label="Hora Inicio"
                          type="time"
                          isRequired
                          step="1800" // 30 min
                        />
                        <FormInput
                          name={`programDays[${index}][toTime]`}
                          label="Hora Fin"
                          type="time"
                          isRequired
                          step="1800" // 30 min
                        />
                        <IconButton
                          alignSelf="flex-end"
                          colorScheme="blue"
                          aria-label="Search database"
                          onClick={() =>
                            setDaysIds(
                              daysIds.filter(
                                (dayId, index2) => index2 !== index
                              )
                            )
                          }
                          icon={<FaTrashAlt />}
                        />
                      </FormStack>
                    ))}
                    <Button
                      colorScheme="blue"
                      size="xs"
                      onClick={() => setDaysIds([...daysIds, { id: uuid() }])}
                    >
                      Agregar día
                    </Button>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Resultados">
                  <FormTextArea name="description" rows={5} />
                </FieldGroup>
              </Stack>
              <HStack width="full" justifyContent="center" mt="8">
                <FormSubmitButton />
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancelar
                </Button>
              </HStack>
            </ValidatedForm>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
