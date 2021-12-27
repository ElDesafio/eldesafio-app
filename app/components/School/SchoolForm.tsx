import {
  Box,
  Button,
  Stack,
  useColorModeValue,
  HStack,
  StackDivider,
  VStack,
  Container,
} from "@chakra-ui/react";
import { FieldGroup } from "~/components/FieldGroup";

import { ValidatedForm, withZod } from "remix-validated-form";
import { FormInput } from "~/components/Form/FormInput";
import { FormSubmitButton } from "~/components/Form/FormSubmitButton";
import * as z from "zod";
import { FormStack } from "~/components/Form/FormStack";
import { ProgramSex, Weekdays } from ".prisma/client";
import { useNavigate } from "remix";
import { schemaCheckbox } from "~/util/utils";

const schoolSchema = z.object({
  name: z.string().nonempty("Nombre no puede estar vacío"),
  address: z.string().nonempty("Dirección no puede estar vacío"),
  city: z.string().nonempty("Ciudad no puede estar vacío"),
  email: z.preprocess(
    (value) => (value === "" ? null : value),
    z.string().email("No es un correo electrónico válido").nullable()
  ),
  phone: z.preprocess(
    (value) => (value === "" ? null : value),
    z.string().nullable()
  ),
  principalName: z.preprocess(
    (value) => (value === "" ? null : value),
    z.string().nullable()
  ),
  principalPhone: z.preprocess(
    (value) => (value === "" ? null : value),
    z.string().nullable()
  ),
  vicePrincipalName: z.preprocess(
    (value) => (value === "" ? null : value),
    z.string().nullable()
  ),
  vicePrincipalPhone: z.preprocess(
    (value) => (value === "" ? null : value),
    z.string().nullable()
  ),
});

export const schoolFormValidator = withZod(schoolSchema);

export function SchoolForm({
  defaultValues,
}: {
  defaultValues?: Partial<z.infer<typeof schoolSchema>>;
}) {
  let navigate = useNavigate();

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
              validator={schoolFormValidator}
              defaultValues={defaultValues}
              method="post"
              noValidate
            >
              <Stack spacing="4" divider={<StackDivider />}>
                <FieldGroup title="Datos Escuela">
                  <VStack width="full" spacing="6" alignItems="flex-start">
                    <FormStack width="full">
                      <FormInput name="name" label="Nombre" isRequired />
                      <FormInput
                        name="email"
                        label="Correo Electrónico"
                        type="email"
                      />
                    </FormStack>
                    <FormStack width="full">
                      <FormInput name="address" label="Dirección" isRequired />
                      <FormInput name="city" label="Ciudad" isRequired />
                      <FormInput name="phone" label="Teléfono" />
                    </FormStack>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Director">
                  <FormStack width="full">
                    <FormInput name="principalName" label="Director/a" />
                    <FormInput
                      name="principalPhone"
                      label="Teléfono Director/a"
                    />
                  </FormStack>
                </FieldGroup>
                <FieldGroup title="Vicedirector">
                  <FormStack width="full">
                    <FormInput
                      name="vicePrincipalName"
                      label="Vicedirector/a"
                    />
                    <FormInput
                      name="vicePrincipalPhone"
                      label="Teléfono Vicedirector/a"
                    />
                  </FormStack>
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
