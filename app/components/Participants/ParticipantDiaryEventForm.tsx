import {
  Box,
  Button,
  HStack,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { ParticipantDiaryType } from '@prisma/client';
import { withZod } from '@remix-validated-form/with-zod';
import { useEffect, useState } from 'react';
import { useNavigate, useTransition } from 'remix';
import { ValidatedForm } from 'remix-validated-form';
import * as z from 'zod';
import { zfd } from 'zod-form-data';

import { FieldGroup } from '~/components/FieldGroup';
import { FormInput } from '~/components/Form/FormInput';
import { FormRichTextEditor } from '~/components/Form/FormRichTextEditor';
import { FormSelect } from '~/components/Form/FormSelect';
import { FormStack } from '~/components/Form/FormStack';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';
import type { GetParticipantPrograms } from '~/services/participants.service';

const diaryEventSchema = zfd.formData({
  title: z.string().nonempty('Título es requerido'),
  type: z.nativeEnum(ParticipantDiaryType, {
    errorMap: () => ({
      message: 'Tipo de evento es requerido',
    }),
  }),
  date: z.string().nonempty('Fecha es requerida'),
  description: zfd.text(z.string().optional()),
  programs: zfd.text(z.string().optional()),
});

export const diaryEventFormValidator = withZod(diaryEventSchema);

type ProgramFormProps = {
  defaultValues?: Partial<z.infer<typeof diaryEventSchema>>;
  programs: Exclude<GetParticipantPrograms, null>;
};

export function ParticipantDiaryEventForm({
  defaultValues,
  programs,
}: ProgramFormProps) {
  let navigate = useNavigate();
  const [cleanPrograms, setCleanPrograms] = useState(programs);
  const [selectedProgramsIds, setSelectedProgramsIds] = useState(
    defaultValues?.programs?.split(',').map(Number) ?? [],
  );

  useEffect(() => {
    setCleanPrograms(
      programs.filter((program) => !selectedProgramsIds.includes(program.id)),
    );
  }, [selectedProgramsIds]);

  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  return (
    <Box px={4} maxWidth="7xl">
      <ValidatedForm
        validator={diaryEventFormValidator}
        defaultValues={defaultValues}
        method="post"
        noValidate
      >
        <Stack spacing="4" divider={<StackDivider />}>
          <FieldGroup title="Datos Básicos">
            <VStack width="full" spacing="6" alignItems="flex-start">
              <FormStack width="full">
                <FormInput name="title" label="Título" isRequired />
                <FormInput
                  name="date"
                  label="Fecha del evento"
                  type="date"
                  isRequired
                  maxWidth="200px"
                />
                <Box maxWidth="420px" width="420px">
                  <FormSelect
                    instanceId="event-type"
                    name="type"
                    label="Tipo de evento"
                    isRequired
                    placeholder="Tipo de evento..."
                    options={[
                      {
                        label: 'Información general',
                        value: ParticipantDiaryType.INFO,
                      },
                      {
                        label: 'Mentoría',
                        value: ParticipantDiaryType.MENTORSHIP,
                      },
                    ]}
                  />
                </Box>
              </FormStack>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Programas">
            <FormStack width="full">
              <FormSelect
                instanceId="programs-select"
                helperText="Acá podés asociar el evento a uno o más programas del participante"
                name="programs"
                label="Programas"
                isMulti
                placeholder="Seleccionar programas..."
                onChange={(newValue) => {
                  if (!newValue) return;

                  if (Array.isArray(newValue)) {
                    setSelectedProgramsIds(newValue.map((p) => p.value));
                  }
                }}
                options={cleanPrograms?.map((program) => ({
                  label: program.name,
                  value: program.id,
                }))}
              />
            </FormStack>
          </FieldGroup>

          <FieldGroup title="Descripción">
            <FormRichTextEditor name="description" />
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
