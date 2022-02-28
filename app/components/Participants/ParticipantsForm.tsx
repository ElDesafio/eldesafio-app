import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { useNavigate } from 'remix';
import { ValidatedForm, withZod } from 'remix-validated-form';
import * as z from 'zod';

import { FieldGroup } from '~/components/FieldGroup';
import { FormCheckbox } from '~/components/Form/FormCheckbox';
import { FormInput } from '~/components/Form/FormInput';
import { FormSelect } from '~/components/Form/FormSelect';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';
import { schemaCheckbox } from '~/util/utils';

import { FormAutocomplete } from '../Form/FormAutocomplete';
import { FormTextArea } from '../Form/FormTextArea';
import { Neighborhood, PhoneBelongsTo, SchoolYear, Sex } from '.prisma/client';

const participantSchema = z.object({
  // id: z.number(),
  // medicalInsurance: z.string().nullable(),
  // createdBy: z.number(),
  // updatedBy: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
  // active: z.boolean(),
  // surveyBiographyId: z.number().nullable(),
  firstName: z.string().nonempty('Nombre no puede estar vacío'),
  lastName: z.string().nonempty('Apellido no puede estar vacío'),
  birthday: z.string().nonempty('Fecha de nacimiento no puede estar vacía'),
  dni: z.string().nonempty('DNI no puede estar vacío'),
  picture: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().url('La URL de la imagen no es válida').nullable(),
  ),
  sex: z.nativeEnum(Sex, {
    errorMap: (issue) => ({
      message: 'Sexo no puede estar vacío',
    }),
  }),
  address: z.string().nullable(),
  city: z.string().nullable(),
  neighborhood: z.preprocess(
    (value) => (value === '' ? null : value),
    z.nativeEnum(Neighborhood).nullable(),
  ),
  email: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().email('No es un correo electrónico válido').nullable(),
  ),
  medicalInsurance: z.string().nullable(),
  phone1: z.string().nullable(),
  phone1HasWhatsapp: schemaCheckbox,
  phone1BelongsTo: z.preprocess(
    (value) => (value === '' ? null : value),
    z.nativeEnum(PhoneBelongsTo).nullable(),
  ),
  phone2: z.string().nullable(),
  phone2HasWhatsapp: schemaCheckbox,
  phone2BelongsTo: z.preprocess(
    (value) => (value === '' ? null : value),
    z.nativeEnum(PhoneBelongsTo).nullable(),
  ),
  schoolId: z.preprocess(
    (value) => (value === '' ? null : Number(value)),
    z.number().positive().nullable(),
  ),
  notSchooled: schemaCheckbox,
  schoolYear: z.preprocess(
    (value) => (value === '' ? null : value),
    z.nativeEnum(SchoolYear).nullable(),
  ),
  biography: z.string().nullable(),
  presentedHealthCertificate: schemaCheckbox,
  healthCertificateDate: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable(),
  ),
  presentedDNI: schemaCheckbox,
});

export const participantFormValidator = withZod(participantSchema);

export function ParticipantForm({
  defaultValues,
  schoolName,
}: {
  defaultValues?: Partial<z.infer<typeof participantSchema>>;
  schoolName?: string;
}) {
  const [uploadedImage, setUploadedImage] = useState<string>(
    defaultValues?.picture || '',
  );
  let navigate = useNavigate();

  return (
    <Box as="main" py="8" flex="1">
      <Container maxW="7xl" id="xxx">
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          p="6"
          rounded="lg"
          shadow="base"
        >
          <Box px={{ base: '4', md: '10' }} maxWidth="7xl">
            <ValidatedForm
              validator={participantFormValidator}
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
                <FieldGroup title="Datos Personales">
                  <VStack width="full" spacing="6">
                    <FormStack width="full">
                      <FormInput name="firstName" label="Nombre" isRequired />
                      <FormInput name="lastName" label="Apellido" isRequired />
                      <FormSelect
                        name="sex"
                        label="Sexo"
                        placeholder="Seleccionar sexo"
                        isRequired
                      >
                        <option value={Sex.MALE}>Varón</option>
                        <option value={Sex.FEMALE}>Mujer</option>
                        <option value={Sex.OTHER}>Otro</option>
                      </FormSelect>
                    </FormStack>
                    <FormStack width="full">
                      <FormInput
                        name="birthday"
                        label="Fecha de Nacimiento"
                        type="date"
                        isRequired
                      />
                      <FormInput name="dni" label="DNI" isRequired />
                      <FormInput name="medicalInsurance" label="Obra Social" />
                    </FormStack>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Datos de Contacto">
                  <VStack width="full" spacing="6">
                    <FormStack width="full">
                      <FormInput name="address" label="Dirección" />
                      <FormInput name="city" label="Ciudad" />
                      <FormSelect
                        name="neighborhood"
                        label="Barrio"
                        placeholder="Seleccionar barrio"
                      >
                        <option value={Neighborhood.LA_LATA}>La Lata</option>
                        <option value={Neighborhood.MORENO}>Moreno</option>
                        <option value={Neighborhood.SAN_FRANCISQUITO}>
                          San Francisquito
                        </option>
                        <option value={Neighborhood.OTHER}>Otro</option>
                      </FormSelect>
                    </FormStack>
                    <FormStack width="full">
                      <FormInput
                        name="email"
                        label="Correo Electrónico"
                        type="email"
                      />
                    </FormStack>
                    <FormStack width="full">
                      <FormInput name="phone1" label="Teléfono 1" />
                      <FormCheckbox
                        name="phone1HasWhatsapp"
                        label="Tiene Whatsapp?"
                        alignSelf="center"
                        justifySelf="center"
                        value="true"
                      >
                        Whatsapp
                      </FormCheckbox>
                      <FormSelect
                        name="phone1BelongsTo"
                        label="Pertenece a"
                        placeholder="Seleccionar a quien pertenece"
                      >
                        <option value={PhoneBelongsTo.SELF}>
                          Participante
                        </option>
                        <option value={PhoneBelongsTo.MOTHER}>Madre</option>
                        <option value={PhoneBelongsTo.FATHER}>Padre</option>
                        <option value={PhoneBelongsTo.TUTOR}>Tutor/Otro</option>
                      </FormSelect>
                    </FormStack>
                    <FormStack width="full">
                      <FormInput name="phone2" label="Teléfono 2" />
                      <FormCheckbox
                        name="phone2HasWhatsapp"
                        label="Tiene Whatsapp?"
                        alignSelf="center"
                        justifySelf="center"
                        value="true"
                      >
                        Whatsapp
                      </FormCheckbox>
                      <FormSelect
                        name="phone2BelongsTo"
                        label="Pertenece a"
                        placeholder="Seleccionar a quien pertenece"
                      >
                        <option value={PhoneBelongsTo.SELF}>
                          Participante
                        </option>
                        <option value={PhoneBelongsTo.MOTHER}>Madre</option>
                        <option value={PhoneBelongsTo.FATHER}>Padre</option>
                        <option value={PhoneBelongsTo.TUTOR}>Tutor/Otro</option>
                      </FormSelect>
                    </FormStack>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Datos Escuela">
                  <VStack width="full" spacing="6">
                    <FormStack width="full">
                      <FormControl>
                        <FormCheckbox name="notSchooled" value="true">
                          No Escolarizado
                        </FormCheckbox>
                      </FormControl>
                    </FormStack>

                    <FormStack width="full">
                      <FormAutocomplete
                        searchFor="school"
                        defaultSelectedLabel={schoolName}
                        name="schoolId"
                        label="Nombre Escuela"
                        placeholder="Buscar..."
                      />
                      <FormSelect
                        name="schoolYear"
                        label="Grado/Año"
                        placeholder="Seleccionar grado/año"
                      >
                        <optgroup label="Grado">
                          <option value={SchoolYear.GRADE_1}>1º grado</option>
                          <option value={SchoolYear.GRADE_2}>2º grado</option>
                          <option value={SchoolYear.GRADE_3}>3º grado</option>
                          <option value={SchoolYear.GRADE_4}>4º grado</option>
                          <option value={SchoolYear.GRADE_5}>5º grado</option>
                          <option value={SchoolYear.GRADE_6}>6º grado</option>
                          <option value={SchoolYear.GRADE_7}>7º grado</option>
                        </optgroup>
                        <optgroup label="Año">
                          <option value={SchoolYear.YEAR_1}>1º año</option>
                          <option value={SchoolYear.YEAR_2}>2º año</option>
                          <option value={SchoolYear.YEAR_3}>3º año</option>
                          <option value={SchoolYear.YEAR_4}>4º año</option>
                          <option value={SchoolYear.YEAR_5}>5º año</option>
                        </optgroup>
                      </FormSelect>
                    </FormStack>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Biografía">
                  <FormTextArea
                    name="biography"
                    rows={5}
                    helperText="Si surgen datos importantes durante la inscripción se pueden detallar aquí (se puede actualizar después)"
                  />
                </FieldGroup>
                <FieldGroup title="Documentos Presentados">
                  <Stack width="full" spacing="4">
                    <FormStack width="full">
                      <FormCheckbox
                        name="presentedHealthCertificate"
                        value="true"
                      >
                        Apto Médico
                      </FormCheckbox>
                      <FormInput
                        name="healthCertificateDate"
                        label="Fecha apto médico"
                        type="date"
                      />
                    </FormStack>
                    <FormCheckbox name="presentedDNI" value="true">
                      DNI
                    </FormCheckbox>
                  </Stack>
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
