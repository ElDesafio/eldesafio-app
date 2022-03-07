import {
  Box,
  Button,
  HStack,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { BloodType, FormAnswerOptions } from '@prisma/client';
import { useState } from 'react';
import { useNavigate, useTransition } from 'remix';
import { ValidatedForm, withZod } from 'remix-validated-form';
import * as z from 'zod';

import { FieldGroup } from '~/components/FieldGroup';
import { FormInput } from '~/components/Form/FormInput';
import { FormSelect } from '~/components/Form/FormSelect';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';

import { FormRadioGroup } from '../Form/FormRadioGroup';
import { FormTextArea } from '../Form/FormTextArea';

const participantHealthSchema = z
  .object({
    bloodType: z.nativeEnum(BloodType, {
      errorMap: () => ({
        message: 'Grupo sanguíneo no puede estar vacío',
      }),
    }),
    isNormalPregnancy: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Emabrazo normal no puede estar vacío',
      }),
    }),
    hasCompleteVaccination: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Vacunación completa no puede estar vacío',
      }),
    }),
    missingVaccines: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    hasCongenitalHeartDisease: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Cardiopatías congénitas no puede estar vacío',
      }),
    }),
    hasHypertension: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Hipertensión arterial no puede estar vacío',
      }),
    }),
    hasHeartMurmurs: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Soplos no puede estar vacío',
      }),
    }),
    hasArrhythmia: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Arritmias no puede estar vacío',
      }),
    }),
    hasAllergy: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Alergias no puede estar vacío',
      }),
    }),
    allergyDetails: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    hasFoodRestriction: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Restricción alimentaria no puede estar vacío',
      }),
    }),
    foodRestrictionDetails: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    hasChronicDisease: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Enfermedad crónica no puede estar vacío',
      }),
    }),
    chronicDiseaseDetails: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    isTakingMedication: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Tomando medicamentos no puede estar vacío',
      }),
    }),
    takingMedicationDetails: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    hasBeenHospitalized: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Internado no puede estar vacío',
      }),
    }),
    hospitalizedDetails: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    canDoPhysicalActivity: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: 'Actividad física no puede estar vacío',
      }),
    }),
    observations: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
  })
  .refine(
    ({ hasCompleteVaccination, missingVaccines }) =>
      (hasCompleteVaccination === FormAnswerOptions.NO && missingVaccines) ||
      hasCompleteVaccination !== FormAnswerOptions.NO,
    {
      path: ['missingVaccines'],
      message: 'Agregar las vacunas que no se completaron',
    },
  )
  .refine(
    ({ hasAllergy, allergyDetails }) =>
      (hasAllergy === FormAnswerOptions.YES && allergyDetails) ||
      hasAllergy !== FormAnswerOptions.YES,
    {
      path: ['allergyDetails'],
      message: 'Es necesario agregar la(s) alergia(s)',
    },
  )
  .refine(
    ({ hasFoodRestriction, foodRestrictionDetails }) =>
      (hasFoodRestriction === FormAnswerOptions.YES &&
        foodRestrictionDetails) ||
      hasFoodRestriction !== FormAnswerOptions.YES,
    {
      path: ['foodRestrictionDetails'],
      message: 'Es necesario especificar las restricciones alimentarias',
    },
  )
  .refine(
    ({ hasChronicDisease, chronicDiseaseDetails }) =>
      (hasChronicDisease === FormAnswerOptions.YES && chronicDiseaseDetails) ||
      hasChronicDisease !== FormAnswerOptions.YES,
    {
      path: ['chronicDiseaseDetails'],
      message: 'Es necesario especificar la enfermedad',
    },
  )
  .refine(
    ({ isTakingMedication, takingMedicationDetails }) =>
      (isTakingMedication === FormAnswerOptions.YES &&
        takingMedicationDetails) ||
      isTakingMedication !== FormAnswerOptions.YES,
    {
      path: ['takingMedicationDetails'],
      message: 'Es necesario especificar los medicamentos',
    },
  )
  .refine(
    ({ hasBeenHospitalized, hospitalizedDetails }) =>
      (hasBeenHospitalized === FormAnswerOptions.YES && hospitalizedDetails) ||
      hasBeenHospitalized !== FormAnswerOptions.YES,
    {
      path: ['hospitalizedDetails'],
      message: 'Es necesario especificar el motivo de internación',
    },
  )
  .transform((data) => {
    if (data.hasCompleteVaccination !== FormAnswerOptions.NO) {
      data.missingVaccines = null;
    }
    if (data.hasAllergy !== FormAnswerOptions.YES) {
      data.allergyDetails = null;
    }
    if (data.hasFoodRestriction !== FormAnswerOptions.YES) {
      data.foodRestrictionDetails = null;
    }
    if (data.hasChronicDisease !== FormAnswerOptions.YES) {
      data.chronicDiseaseDetails = null;
    }
    if (data.isTakingMedication !== FormAnswerOptions.YES) {
      data.takingMedicationDetails = null;
    }
    if (data.hasBeenHospitalized !== FormAnswerOptions.YES) {
      data.hospitalizedDetails = null;
    }
    return data;
  });

export const participantHealthValidator = withZod(participantHealthSchema);

export function ParticipantHealthForm({
  defaultValues,
}: {
  defaultValues?: Partial<z.infer<typeof participantHealthSchema>>;
}) {
  let navigate = useNavigate();
  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  const [showMissingVaccines, setShowMissingVaccines] = useState(
    defaultValues?.hasCompleteVaccination === FormAnswerOptions.NO,
  );
  const [showAllergyDetails, setShowAllergyDetails] = useState(
    defaultValues?.hasAllergy === FormAnswerOptions.YES,
  );
  const [showFoodRestrictionDetails, setShowFoodRestrictionDetails] = useState(
    defaultValues?.hasFoodRestriction === FormAnswerOptions.YES,
  );
  const [showChronicDiseaseDetails, setShowChronicDiseaseDetails] = useState(
    defaultValues?.hasChronicDisease === FormAnswerOptions.YES,
  );

  const [showTakingMedicationDetails, setShowTakingMedicationDetails] =
    useState(defaultValues?.isTakingMedication === FormAnswerOptions.YES);
  const [showHospitalizedDetails, setShowHospitalizedDetails] = useState(
    defaultValues?.hasBeenHospitalized === FormAnswerOptions.YES,
  );

  return (
    <Box px={{ base: '4', md: '10' }} maxWidth="7xl">
      <ValidatedForm
        validator={participantHealthValidator}
        defaultValues={defaultValues}
        method="post"
        noValidate
      >
        <Stack spacing="4" divider={<StackDivider />}>
          <FieldGroup title="Antecedentes fisiológicos">
            <VStack width="full" spacing="6" alignItems="flex-start">
              <FormStack width={{ base: '100%', md: '30%' }}>
                <FormSelect
                  instanceId="select-bloodtype"
                  name="bloodType"
                  label="Grupo sanguíneo"
                  isRequired
                  placeholder="Grupo sanguíneo..."
                  options={[
                    { value: BloodType.A_POSITIVE, label: 'A+' },
                    { value: BloodType.A_NEGATIVE, label: 'A-' },
                    { value: BloodType.B_POSITIVE, label: 'B+' },
                    { value: BloodType.B_NEGATIVE, label: 'B+' },
                    { value: BloodType.AB_POSITIVE, label: 'AB+' },
                    { value: BloodType.AB_NEGATIVE, label: 'AB+' },
                    { value: BloodType.ZERO_POSITIVE, label: '0+' },
                    { value: BloodType.ZERO_NEGATIVE, label: '0+' },
                  ]}
                />
              </FormStack>
              <FormStack width="full">
                <FormRadioGroup
                  name="isNormalPregnancy"
                  label="Embarazo normal"
                  redAnswer="no"
                  isRequired
                />
              </FormStack>
              <FormStack width="full">
                <FormRadioGroup
                  name="hasCompleteVaccination"
                  label="¿Tiene todas las vacunas que corresponden por su edad?"
                  redAnswer="no"
                  isRequired
                  onChange={(value) =>
                    setShowMissingVaccines(value === FormAnswerOptions.NO)
                  }
                />
                {showMissingVaccines && (
                  <FormInput
                    name="missingVaccines"
                    label="Anotar si alguna vacuna no se completó"
                    isRequired
                  />
                )}
              </FormStack>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Enfermedades del corazón">
            <VStack width="full" spacing="6">
              <FormStack width="full">
                <FormRadioGroup
                  name="hasCongenitalHeartDisease"
                  label="Cardiopatías congénitas"
                  redAnswer="yes"
                  isRequired
                />
                <FormRadioGroup
                  name="hasHeartMurmurs"
                  label="Soplos"
                  redAnswer="yes"
                  isRequired
                />
              </FormStack>
              <FormStack width="full">
                <FormRadioGroup
                  name="hasHypertension"
                  label="Hipertensión arterial"
                  redAnswer="yes"
                  isRequired
                />
                <FormRadioGroup
                  name="hasArrhythmia"
                  label="Arritmias"
                  redAnswer="yes"
                  isRequired
                />
              </FormStack>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Alergias">
            <VStack width="full" spacing="6">
              <FormStack width="full">
                <FormRadioGroup
                  name="hasAllergy"
                  label="¿Sufre de algún tipo de alergia?"
                  redAnswer="yes"
                  isRequired
                  onChange={(value) =>
                    setShowAllergyDetails(value === FormAnswerOptions.YES)
                  }
                />
                {showAllergyDetails && (
                  <FormInput
                    name="allergyDetails"
                    label="Especificar tipo de alergia"
                    isRequired
                  />
                )}{' '}
              </FormStack>
              <FormStack width="full">
                <FormRadioGroup
                  name="hasFoodRestriction"
                  label="¿Tiene alguna restricción alimentaria?"
                  redAnswer="yes"
                  isRequired
                  onChange={(value) =>
                    setShowFoodRestrictionDetails(
                      value === FormAnswerOptions.YES,
                    )
                  }
                />
                {showFoodRestrictionDetails && (
                  <FormInput
                    name="foodRestrictionDetails"
                    label="Especificar alimentos"
                    isRequired
                  />
                )}{' '}
              </FormStack>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Otras">
            <VStack width="full" spacing="6">
              <FormStack width="full">
                <FormRadioGroup
                  name="hasChronicDisease"
                  label="¿Sufre alguna enfermedad crónica?"
                  redAnswer="yes"
                  isRequired
                  onChange={(value) =>
                    setShowChronicDiseaseDetails(
                      value === FormAnswerOptions.YES,
                    )
                  }
                />
                {showChronicDiseaseDetails && (
                  <FormInput
                    name="chronicDiseaseDetails"
                    label="Especificar enfermedad"
                    isRequired
                  />
                )}{' '}
              </FormStack>
              <FormStack width="full">
                <FormRadioGroup
                  name="isTakingMedication"
                  label="Está tomando medicamentos"
                  redAnswer="yes"
                  isRequired
                  onChange={(value) =>
                    setShowTakingMedicationDetails(
                      value === FormAnswerOptions.YES,
                    )
                  }
                />
                {showTakingMedicationDetails && (
                  <FormInput
                    name="takingMedicationDetails"
                    label="Especificar nombres"
                    isRequired
                  />
                )}{' '}
              </FormStack>
              <FormStack width="full">
                <FormRadioGroup
                  name="hasBeenHospitalized"
                  label="Ha estado internado alguna vez"
                  redAnswer="yes"
                  isRequired
                  onChange={(value) =>
                    setShowHospitalizedDetails(value === FormAnswerOptions.YES)
                  }
                />
                {showHospitalizedDetails && (
                  <FormInput
                    name="hospitalizedDetails"
                    label="Especificar motivo"
                    isRequired
                  />
                )}{' '}
              </FormStack>
              <FormStack width="full">
                <FormRadioGroup
                  name="canDoPhysicalActivity"
                  label="¿Cree Ud. que su hijo puede realizar actividad física?"
                  redAnswer="no"
                  isRequired
                />
              </FormStack>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Observaciones">
            <FormTextArea
              name="observations"
              placeholder="Observaciones"
              rows={5}
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
  );
}
