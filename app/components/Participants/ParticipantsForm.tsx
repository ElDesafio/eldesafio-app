import {
  Box,
  Button,
  Stack,
  useColorModeValue,
  Avatar,
  FormControl,
  FormHelperText,
  HStack,
  StackDivider,
  Text,
  Textarea,
  VStack,
  Container,
} from "@chakra-ui/react";
import { HiCloudUpload } from "react-icons/hi";
import { FieldGroup } from "~/components/FieldGroup";

import { ValidatedForm, withZod } from "remix-validated-form";
import { FormInput } from "~/components/Form/FormInput";
import { FormSubmitButton } from "~/components/Form/FormSubmitButton";
import * as z from "zod";
import { FormStack } from "~/components/Form/FormStack";
import { useState } from "react";
import { FormSelect } from "~/components/Form/FormSelect";
import { Neighborhood, PhoneBelongsTo, Sex } from ".prisma/client";
import { FormCheckbox } from "~/components/Form/FormCheckbox";

const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

const participantFormSchema = z.object({
  firstName: z.string().nonempty("Nombre no puede estar vacío"),
  lastName: z.string().nonempty("Apellido no puede estar vacío"),
  birthday: z.string().nonempty("Fecha de nacimiento no puede estar vacía"),
  dni: z.string().nonempty("DNI no puede estar vacío"),
  picture: z
    .optional(z.string().url("La URL de la imagen no es válida"))
    .or(z.literal(""))
    .transform((value) => value || undefined),
  sex: z.nativeEnum(Sex, {
    errorMap: (issue) => ({
      message: "Sexo no puede estar vacío",
    }),
  }),
  address: z.string().optional(),
  city: z.string().optional(),
  neighborhood: asOptionalField(z.nativeEnum(Neighborhood)),
  email: asOptionalField(z.string().email("No es un correo elecrónico válido")),
  phone1: z.string().optional(),
  phone1HasWhatsapp: asOptionalField(z.string()),
  phone1BelongsTo: asOptionalField(z.nativeEnum(PhoneBelongsTo)),
  phone2: z.string().optional(),
  phone2HasWhatsapp: asOptionalField(z.string()),
  phone2BelongsTo: asOptionalField(z.nativeEnum(PhoneBelongsTo)),
  biography: z.string().optional(),
  presentedHealthCertificate: asOptionalField(z.string()),
  healthCertificateDate: asOptionalField(z.string().optional()),
  presentedDNI: asOptionalField(z.string()),
});

export const participantFormValidator = withZod(participantFormSchema);

export function ParticipantForm() {
  const [uploadedImage, setUploadedImage] = useState<string>("");

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
            <ValidatedForm validator={participantFormValidator} method="post">
              <Stack spacing="4" divider={<StackDivider />}>
                <FieldGroup title="Foto">
                  <Stack
                    direction={{ base: "column", sm: "row" }}
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
                                  cloudName: "eldesafio",
                                  uploadPreset: "ed-preset",
                                  sources: ["local", "camera"],
                                  googleApiKey: "<image_search_google_api_key>",
                                  showAdvancedOptions: false,
                                  cropping: true,
                                  croppingAspectRatio: 1,
                                  multiple: false,
                                  defaultSource: "camera",
                                  showSkipCropButton: false,
                                  styles: {
                                    palette: {
                                      window: "#F5F5F5",
                                      sourceBg: "#FFFFFF",
                                      windowBorder: "#90a0b3",
                                      tabIcon: "#0094c7",
                                      inactiveTabIcon: "#69778A",
                                      menuIcons: "#0094C7",
                                      link: "#53ad9d",
                                      action: "#8F5DA5",
                                      inProgress: "#0194c7",
                                      complete: "#53ad9d",
                                      error: "#c43737",
                                      textDark: "#000000",
                                      textLight: "#FFFFFF",
                                    },
                                    fonts: {
                                      default: null,
                                      "'Poppins', sans-serif": {
                                        url: "https://fonts.googleapis.com/css?family=Poppins",
                                        active: true,
                                      },
                                    },
                                  },
                                },
                                (error: any, result: any) => {
                                  if (
                                    !error &&
                                    result &&
                                    result.event === "success"
                                  ) {
                                    console.log(result);
                                    setUploadedImage(result.info.secure_url);
                                  }
                                }
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
                          onClick={() => setUploadedImage("")}
                        >
                          Borrar
                        </Button>
                      </HStack>
                      <Text
                        fontSize="sm"
                        mt="3"
                        color={useColorModeValue("gray.500", "whiteAlpha.600")}
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
                    <FormStack>
                      <FormInput name="firstName" label="Nombre" isRequired />
                      <FormInput name="lastName" label="Apellido" isRequired />
                    </FormStack>
                    <FormStack>
                      <FormInput
                        name="birthday"
                        label="Fecha de Nacimiento"
                        type="date"
                        isRequired
                      />
                      <FormInput name="dni" label="DNI" isRequired />
                      <FormSelect
                        name="sex"
                        label="Sexo"
                        isRequired
                        placeholder="Seleccionar sexo"
                      >
                        <option value={Sex.MALE}>Varón</option>
                        <option value={Sex.FEMALE}>Mujer</option>
                        <option value={Sex.OTHER}>Otro</option>
                      </FormSelect>
                    </FormStack>
                  </VStack>
                </FieldGroup>
                <FieldGroup title="Datos de Contacto">
                  <VStack width="full" spacing="6">
                    <FormStack>
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
                    <FormStack>
                      <FormInput
                        name="email"
                        label="Correo Electrónico"
                        type="email"
                      />
                    </FormStack>
                    <FormStack>
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
                    <FormStack>
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
                <FieldGroup title="Biografía">
                  <FormControl id="biography">
                    <Textarea rows={5} />
                    <FormHelperText>
                      Si surgen datos importantes durante la inscripción se
                      pueden detallar aquí (se puede actualizar después)
                    </FormHelperText>
                  </FormControl>
                </FieldGroup>
                <FieldGroup title="Documentos Presentados">
                  <Stack width="full" spacing="4">
                    <FormStack>
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
                <Button variant="outline">Cancel</Button>
              </HStack>
            </ValidatedForm>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
