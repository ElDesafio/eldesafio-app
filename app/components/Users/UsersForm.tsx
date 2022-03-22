import {
  Avatar,
  Box,
  Button,
  chakra,
  Container,
  HStack,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Roles, UserStatus } from '@prisma/client';
import { withZod } from '@remix-validated-form/with-zod';
import { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaSkype, FaTwitter } from 'react-icons/fa';
import { HiCloudUpload } from 'react-icons/hi';
import { useNavigate, useTransition } from 'remix';
import { ValidatedForm } from 'remix-validated-form';
import * as z from 'zod';

import { FieldGroup } from '~/components/FieldGroup';
import { FormInput } from '~/components/Form/FormInput';
import { FormSelect } from '~/components/Form/FormSelect';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';
import { getUserRoleName } from '~/util/utils';

import { FormRichTextEditor } from '../Form/FormRichTextEditor';

const zStringOptional = z.preprocess(
  (value) => (value === '' ? null : value),
  z.string().nullable().optional(),
);

const userSchema = z.object({
  firstName: z.string().nonempty('Nombre no puede estar vacío'),
  lastName: z.string().nonempty('Apellido no puede estar vacío'),
  status: z.nativeEnum(UserStatus, {
    errorMap: () => ({
      message: 'Status no puede estar vacío',
    }),
  }),
  email: z
    .string()
    .email('El correo no es válido')
    .nonempty('Email no puede estar vacío'),
  birthday: zStringOptional,
  address: zStringOptional,
  city: zStringOptional,
  phone1: zStringOptional,
  phone2: zStringOptional,
  twitter: zStringOptional,
  facebook: zStringOptional,
  linkedin: zStringOptional,
  skype: zStringOptional,
  biography: zStringOptional,
  roles: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable().optional(),
  ),
  picture: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().url('La URL de la imagen no es válida').nullable(),
  ),
});

export const userFormValidator = withZod(userSchema);

export function UserForm({
  defaultValues,
}: {
  defaultValues?: Partial<z.infer<typeof userSchema>>;
}) {
  const [uploadedImage, setUploadedImage] = useState<string>(
    defaultValues?.picture || '',
  );
  const [status, setStatus] = useState(
    defaultValues?.status || UserStatus.INACTIVE,
  );
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
          <Box px={{ base: '4', md: '10' }} maxWidth="7xl">
            <ValidatedForm
              validator={userFormValidator}
              defaultValues={defaultValues}
              method="post"
              noValidate
            >
              <Stack spacing="4" divider={<StackDivider />}>
                <FieldGroup title="Foto">
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    spacing="6"
                    align="center"
                    width="full"
                  >
                    <Avatar size="xl" src={uploadedImage} />
                    <Box>
                      <HStack spacing="5">
                        <Button
                          leftIcon={<HiCloudUpload />}
                          onClick={() => {
                            if (window) {
                              const widget = (
                                window as any
                              ).cloudinary?.createUploadWidget(
                                {
                                  cloudName: 'eldesafio',
                                  uploadPreset: 'ed-preset',
                                  sources: ['local', 'camera'],
                                  googleApiKey: '<image_search_google_api_key>',
                                  showAdvancedOptions: false,
                                  cropping: true,
                                  croppingAspectRatio: 1,
                                  multiple: false,
                                  defaultSource: 'camera',
                                  showSkipCropButton: false,
                                  styles: {
                                    palette: {
                                      window: '#F5F5F5',
                                      sourceBg: '#FFFFFF',
                                      windowBorder: '#90a0b3',
                                      tabIcon: '#0094c7',
                                      inactiveTabIcon: '#69778A',
                                      menuIcons: '#0094C7',
                                      link: '#53ad9d',
                                      action: '#8F5DA5',
                                      inProgress: '#0194c7',
                                      complete: '#53ad9d',
                                      error: '#c43737',
                                      textDark: '#000000',
                                      textLight: '#FFFFFF',
                                    },
                                    fonts: {
                                      default: null,
                                      "'Poppins', sans-serif": {
                                        url: 'https://fonts.googleapis.com/css?family=Poppins',
                                        active: true,
                                      },
                                    },
                                  },
                                },
                                (error: any, result: any) => {
                                  if (
                                    !error &&
                                    result &&
                                    result.event === 'success'
                                  ) {
                                    setUploadedImage(result.info.secure_url);
                                  }
                                },
                              );
                              if (widget) {
                                widget.open();
                              }
                            }
                          }}
                        >
                          Cambiar foto
                        </Button>
                        <Button
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => setUploadedImage('')}
                        >
                          Borrar
                        </Button>
                      </HStack>
                      <Text
                        fontSize="sm"
                        mt="3"
                        color={useColorModeValue('gray.500', 'whiteAlpha.600')}
                      >
                        Usa la webcam (recomendado) o sube una foto.
                      </Text>
                      <FormInput
                        name="picture"
                        label="Foto"
                        value={uploadedImage}
                        hidden
                      />
                    </Box>
                  </Stack>
                </FieldGroup>
                <FieldGroup title="Status">
                  <FormStack width="full" maxWidth="400px">
                    <FormSelect
                      instanceId="status-select"
                      helperText="Los usuarios inactivos no pueden acceder a la app. Los invitados son usuarios que todavía no accedieron a la app."
                      name="status"
                      label="Status"
                      placeholder="Seleccionar rol(es)"
                      onChange={(option) => setStatus((option as any).value)}
                      color={
                        status === UserStatus.ACTIVE
                          ? 'blue'
                          : status === UserStatus.INACTIVE
                          ? 'red'
                          : 'gray'
                      }
                      options={[
                        {
                          label: 'Activo',
                          value: UserStatus.ACTIVE,
                        },
                        {
                          label: 'Inactivo',
                          value: UserStatus.INACTIVE,
                        },
                        {
                          label: 'Invitado',
                          value: UserStatus.INVITED,
                        },
                      ]}
                    />
                  </FormStack>
                </FieldGroup>

                <FieldGroup title="Datos Personales">
                  <VStack width="full" spacing="6">
                    <FormStack width="full">
                      <FormInput name="firstName" label="Nombre" isRequired />
                      <FormInput name="lastName" label="Apellido" isRequired />
                      <FormInput
                        name="birthday"
                        label="Fecha de Nacimiento"
                        type="date"
                      />
                    </FormStack>
                    <FormStack width="full">
                      <FormInput
                        name="email"
                        label="Correo Electrónico"
                        type="email"
                        isRequired
                      />
                      <FormInput name="phone1" label="Teléfono 1" />
                      <FormInput name="phone2" label="Teléfono 2" />
                    </FormStack>
                    <FormStack width="full">
                      <FormInput name="address" label="Dirección" />
                      <FormInput name="city" label="Ciudad" />
                    </FormStack>
                    <FormStack width="full">
                      <FormInput
                        name="twitter"
                        label="Twitter"
                        leftElement={
                          <chakra.span color="gray.300">
                            <FaTwitter />
                          </chakra.span>
                        }
                      />
                      <FormInput
                        name="facebook"
                        label="Facebook"
                        leftElement={
                          <chakra.span color="gray.300">
                            <FaFacebookF />
                          </chakra.span>
                        }
                      />
                    </FormStack>
                    <FormStack width="full">
                      <FormInput
                        name="linkedin"
                        label="Linkedin"
                        leftElement={
                          <chakra.span color="gray.300">
                            <FaLinkedinIn />
                          </chakra.span>
                        }
                      />
                      <FormInput
                        name="skype"
                        label="Skype"
                        leftElement={
                          <chakra.span color="gray.300">
                            <FaSkype />
                          </chakra.span>
                        }
                      />
                    </FormStack>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Rol">
                  <FormStack width="full">
                    <FormSelect
                      instanceId="roles-select"
                      name="roles"
                      label="Rol"
                      isMulti
                      placeholder="Seleccionar rol(es)"
                      options={(
                        Object.keys(Roles) as Array<keyof typeof Roles>
                      ).map((role) => ({
                        label: getUserRoleName(role),
                        value: role,
                      }))}
                    />
                  </FormStack>
                </FieldGroup>
                <FieldGroup title="Biografía">
                  <FormRichTextEditor
                    name="biography"
                    rows={5}
                    helperText="Detallar estudios y experiencia laboral"
                  />
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
