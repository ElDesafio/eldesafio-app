import {
  Box,
  Button,
  HStack,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { FormAnswerOptions } from '@prisma/client';
import { withZod } from '@remix-validated-form/with-zod';
import { useState } from 'react';
import { useNavigate, useTransition } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import * as z from 'zod';

import { FieldGroup } from '~/components/FieldGroup';
import { FormInput } from '~/components/Form/FormInput';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';

import { FormRadioGroup } from '../Form/FormRadioGroup';

const stringErrorMessage = 'Este es un campo requerido';

const participantBioSurveySchema = z
  .object({
    livesWith: z.string().nonempty(stringErrorMessage),
    changedSchool: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: stringErrorMessage,
      }),
    }),
    reasonChangedSchool: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    repeatedYear: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: stringErrorMessage,
      }),
    }),
    reasonRepeatedYear: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    schoolSituation: z.string().nonempty(stringErrorMessage),
    programsInterest: z.string().nonempty(stringErrorMessage),
    participatedBefore: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: stringErrorMessage,
      }),
    }),
    participatedBeforeDescription: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    finishedYear: z
      .nativeEnum(FormAnswerOptions, {
        errorMap: () => ({
          message: stringErrorMessage,
        }),
      })
      .nullable()
      .optional(),
    otherActivities: z.nativeEnum(FormAnswerOptions, {
      errorMap: () => ({
        message: stringErrorMessage,
      }),
    }),
    otherActivitiesDescription: z.preprocess(
      (value) => (value === '' ? null : value),
      z.string().nullable().optional(),
    ),
    personalDescription: z.string().nonempty(stringErrorMessage),
    homeActivities: z.string().nonempty(stringErrorMessage),
  })
  .refine(
    ({ changedSchool, reasonChangedSchool }) =>
      (changedSchool === FormAnswerOptions.YES && reasonChangedSchool) ||
      changedSchool !== FormAnswerOptions.YES,
    {
      path: ['reasonChangedSchool'],
      message: 'Es necesario indicar el motivo',
    },
  )
  .refine(
    ({ repeatedYear, reasonRepeatedYear }) =>
      (repeatedYear === FormAnswerOptions.YES && reasonRepeatedYear) ||
      repeatedYear !== FormAnswerOptions.YES,
    {
      path: ['reasonRepeatedYear'],
      message: 'Es necesario indicar el motivo',
    },
  )
  .refine(
    ({ participatedBefore, participatedBeforeDescription }) =>
      (participatedBefore === FormAnswerOptions.YES &&
        participatedBeforeDescription) ||
      participatedBefore !== FormAnswerOptions.YES,
    {
      path: ['participatedBeforeDescription'],
      message: stringErrorMessage,
    },
  )
  .refine(
    ({ participatedBefore, finishedYear }) =>
      (participatedBefore === FormAnswerOptions.YES && finishedYear) ||
      participatedBefore !== FormAnswerOptions.YES,
    {
      path: ['finishedYear'],
      message: stringErrorMessage,
    },
  )
  .refine(
    ({ otherActivities, otherActivitiesDescription }) =>
      (otherActivities === FormAnswerOptions.YES &&
        otherActivitiesDescription) ||
      otherActivities !== FormAnswerOptions.YES,
    {
      path: ['otherActivitiesDescription'],
      message: stringErrorMessage,
    },
  )
  .transform((data) => {
    if (data.changedSchool !== FormAnswerOptions.YES) {
      data.reasonChangedSchool = null;
    }
    if (data.repeatedYear !== FormAnswerOptions.YES) {
      data.reasonRepeatedYear = null;
    }
    if (data.participatedBefore !== FormAnswerOptions.YES) {
      data.participatedBeforeDescription = null;
      data.finishedYear = null;
    }
    if (data.otherActivities !== FormAnswerOptions.YES) {
      data.otherActivitiesDescription = null;
    }
    return data;
  });
export const participantBioSurveyValidator = withZod(
  participantBioSurveySchema,
);

export function ParticipantBioSurveyForm({
  defaultValues,
}: {
  defaultValues?: Partial<z.infer<typeof participantBioSurveySchema>>;
}) {
  let navigate = useNavigate();
  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  const [showReasonChangedSchool, setShowReasonChangedSchool] = useState(
    defaultValues?.changedSchool === FormAnswerOptions.YES,
  );
  const [showReasonRepeated, setShowReasonRepeated] = useState(
    defaultValues?.repeatedYear === FormAnswerOptions.YES,
  );
  const [showParticipatedSection, setShowParticipatedSection] = useState(
    defaultValues?.participatedBefore === FormAnswerOptions.YES,
  );

  const [showOtherActivitiesDescription, setShowOtherActivitiesDescription] =
    useState(defaultValues?.otherActivities === FormAnswerOptions.YES);

  return (
    <Box px={{ base: '4', md: '10' }} maxWidth="7xl">
      <ValidatedForm
        validator={participantBioSurveyValidator}
        defaultValues={defaultValues}
        method="post"
        noValidate
      >
        <Stack spacing="4" divider={<StackDivider />}>
          <FieldGroup title="Familia">
            <FormStack width="full">
              <FormInput
                name="livesWith"
                label="¿Quiénes viven en la casa?"
                isRequired
                placeholder="mamá, papá, hermanos, etc."
              />
            </FormStack>
          </FieldGroup>
          <FieldGroup title="Escuela">
            <VStack width="full" spacing="6">
              <FormStack width="full">
                <FormRadioGroup
                  name="changedSchool"
                  label="¿Se cambió alguna vez de escuela?"
                  redAnswer="yes"
                  isRequired
                  onChange={(value) =>
                    setShowReasonChangedSchool(value === FormAnswerOptions.YES)
                  }
                />
                {showReasonChangedSchool && (
                  <FormInput
                    name="reasonChangedSchool"
                    label="Motivo"
                    isRequired
                    placeholder="Motivo por el cual se cambió de escuepa"
                  />
                )}
              </FormStack>

              <FormStack width="full">
                <FormRadioGroup
                  name="repeatedYear"
                  label="¿Repitió alguna vez?"
                  redAnswer="yes"
                  isRequired
                  onChange={(value) =>
                    setShowReasonRepeated(value === FormAnswerOptions.YES)
                  }
                />
                {showReasonRepeated && (
                  <FormInput
                    name="reasonRepeatedYear"
                    label="Motivo"
                    isRequired
                    placeholder="Motivo por el cual repitió"
                  />
                )}
              </FormStack>
              <FormStack width="full">
                <FormInput
                  name="schoolSituation"
                  label="¿Cómo es la situación en la escuela?"
                  isRequired
                  placeholder=""
                />
              </FormStack>
            </VStack>
          </FieldGroup>
          <FieldGroup title="El Desafío">
            <VStack width="full" spacing="6">
              <FormStack width="full">
                <FormInput
                  name="programsInterest"
                  label="¿Por qué le interesa que participe en los programas?"
                  isRequired
                  placeholder=""
                />
              </FormStack>
              <FormStack width="full">
                <FormRadioGroup
                  name="participatedBefore"
                  label="¿Participó en años anteriores?"
                  redAnswer="no"
                  isRequired
                  onChange={(value) =>
                    setShowParticipatedSection(value === FormAnswerOptions.YES)
                  }
                />
              </FormStack>
              {showParticipatedSection && (
                <>
                  <FormStack width="full">
                    <FormInput
                      name="participatedBeforeDescription"
                      label="¿Desde qué año y en qué programas?"
                      isRequired
                      placeholder=""
                    />
                  </FormStack>
                  <FormStack width="full">
                    <FormRadioGroup
                      name="finishedYear"
                      label="¿Terminó el año?"
                      redAnswer="no"
                      isRequired
                    />
                  </FormStack>
                </>
              )}
            </VStack>
          </FieldGroup>
          <FieldGroup title="Sobre el participante">
            <VStack width="full" spacing="6">
              <FormStack width="full">
                <FormRadioGroup
                  name="otherActivities"
                  label="¿Realiza alguna actividad además de El Desafío?"
                  redAnswer="no"
                  isRequired
                  onChange={(value) =>
                    setShowOtherActivitiesDescription(
                      value === FormAnswerOptions.YES,
                    )
                  }
                />
              </FormStack>
              {showOtherActivitiesDescription && (
                <FormStack width="full">
                  <FormInput
                    name="otherActivitiesDescription"
                    label="¿Cuál/es?"
                    isRequired
                    placeholder=""
                  />
                </FormStack>
              )}
              <FormStack width="full">
                <FormInput
                  name="personalDescription"
                  label="¿Como lo/la describiría?"
                  isRequired
                  placeholder=""
                />
              </FormStack>
              <FormStack width="full">
                <FormInput
                  name="homeActivities"
                  label="¿Qué hace en su casa? ¿Con qué y con quién juega? ¿Como es un día típico?"
                  isRequired
                  placeholder=""
                />
              </FormStack>
            </VStack>
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
