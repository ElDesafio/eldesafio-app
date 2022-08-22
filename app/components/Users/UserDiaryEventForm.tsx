import { Box, Button, HStack, Stack, VStack } from '@chakra-ui/react';
import { UserDiaryType } from '@prisma/client';
import { useNavigate, useTransition } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { useEffect, useState } from 'react';
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
import { getUserDiaryTypeProps } from '~/util/utils';

const userDiaryEventSchema = zfd.formData({
  title: z.string().nonempty('Título es requerido'),
  type: z.nativeEnum(UserDiaryType, {
    errorMap: () => ({
      message: 'Tipo de evento es requerido',
    }),
  }),
  date: z.string().nonempty('Fecha es requerida'),
  description: zfd.text(z.string().optional()),
  programs: zfd.text(z.string().optional()),
});

export const userDiaryEventFormValidator = withZod(userDiaryEventSchema);

type UserDiaryEventFormProps = {
  defaultValues?: Partial<z.infer<typeof userDiaryEventSchema>>;
  programs: Exclude<GetParticipantPrograms, null>;
  isAutoEvent?: boolean;
};

export function UserDiaryEventForm({
  isAutoEvent = false,
  defaultValues,
  programs,
}: UserDiaryEventFormProps) {
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

  const eventTypeOptions: { label: string; value: UserDiaryType }[] = [
    {
      label: getUserDiaryTypeProps(UserDiaryType.INFO).description,
      value: UserDiaryType.INFO,
    },
  ];

  // A hack to know if it's a new event or not. We only show these options for autoevents
  if (defaultValues?.date) {
    eventTypeOptions.push(
      ...[
        {
          label: getUserDiaryTypeProps(UserDiaryType.STATUS_INVITED)
            .description,
          value: UserDiaryType.STATUS_INVITED,
        },
        {
          label: getUserDiaryTypeProps(UserDiaryType.STATUS_ACTIVE).description,
          value: UserDiaryType.STATUS_ACTIVE,
        },
        {
          label: getUserDiaryTypeProps(UserDiaryType.STATUS_INACTIVE)
            .description,
          value: UserDiaryType.STATUS_INACTIVE,
        },
        {
          label: getUserDiaryTypeProps(UserDiaryType.PROGRAM_STATUS_ACTIVE)
            .description,
          value: UserDiaryType.PROGRAM_STATUS_ACTIVE,
        },
        {
          label: getUserDiaryTypeProps(UserDiaryType.PROGRAM_STATUS_INACTIVE)
            .description,
          value: UserDiaryType.PROGRAM_STATUS_INACTIVE,
        },
      ],
    );
  }

  return (
    <Box px={4} maxWidth="7xl">
      <ValidatedForm
        validator={userDiaryEventFormValidator}
        defaultValues={defaultValues}
        method="post"
        noValidate
      >
        <Stack spacing="4">
          <FieldGroup
            title="Datos Básicos"
            visibility={isAutoEvent ? 'hidden' : undefined}
            position={isAutoEvent ? 'absolute' : undefined}
            left={isAutoEvent ? '-9999em' : undefined}
          >
            <VStack width="full" spacing="6" alignItems="flex-start">
              <FormStack width="full">
                <FormInput name="title" label="Título" isRequired />
                <FormInput
                  name="date"
                  label="Fecha del evento"
                  type="datetime-local"
                  isRequired
                  maxWidth="260px"
                />
                <Box maxWidth="420px" width="420px">
                  <FormSelect
                    instanceId="event-type"
                    name="type"
                    label="Tipo de evento"
                    isRequired
                    placeholder="Tipo de evento..."
                    options={eventTypeOptions}
                  />
                </Box>
              </FormStack>
            </VStack>
          </FieldGroup>
          <FieldGroup
            title="Programas"
            visibility={isAutoEvent ? 'hidden' : undefined}
            position={isAutoEvent ? 'absolute' : undefined}
            left={isAutoEvent ? '-9999em' : undefined}
          >
            <FormStack width="full">
              <FormSelect
                instanceId="programs-select"
                helperText="Acá podés asociar el evento a uno o más programas del usuario"
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
