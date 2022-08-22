import {
  Box,
  Button,
  Container,
  HStack,
  Stack,
  StackDivider,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useNavigate, useTransition } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm } from 'remix-validated-form';
import * as z from 'zod';

import { FieldGroup } from '~/components/FieldGroup';
import { FormInput } from '~/components/Form/FormInput';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';

const schoolSchema = z.object({
  name: z.string().nonempty('Nombre no puede estar vacío'),
  address: z.string().nonempty('Dirección no puede estar vacío'),
  city: z.string().nonempty('Ciudad no puede estar vacío'),
  email: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().email('No es un correo electrónico válido').nullable(),
  ),
  phone: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable(),
  ),
  principalName: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable(),
  ),
  principalPhone: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable(),
  ),
  vicePrincipalName: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable(),
  ),
  vicePrincipalPhone: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable(),
  ),
});

export const schoolFormValidator = withZod(schoolSchema);

export function SchoolForm({
  defaultValues,
}: {
  defaultValues?: Partial<z.infer<typeof schoolSchema>>;
}) {
  let navigate = useNavigate();

  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  return (
    <Box as="main" py="8" flex="1">
      <Container maxW="8xl" id="xxx">
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          p="6"
          rounded="lg"
          shadow="base"
        >
          <Box px={4} maxWidth="full">
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
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancelar
                </Button>
                <FormSubmitButton isLoading={isSaving} />
              </HStack>
            </ValidatedForm>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
