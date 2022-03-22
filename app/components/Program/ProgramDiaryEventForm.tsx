import { Box, Button, HStack, Stack, VStack } from '@chakra-ui/react';
import { ParticipantDiaryType, ProgramDiaryType } from '@prisma/client';
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
import type { GetProgramParticipants } from '~/services/programs.service';

const programDiaryEventSchema = zfd.formData({
  title: z.string().nonempty('Título es requerido'),
  type: z.nativeEnum(ProgramDiaryType, {
    errorMap: () => ({
      message: 'Tipo de evento es requerido',
    }),
  }),
  date: z.string().nonempty('Fecha es requerida'),
  description: zfd.text(z.string().optional()),
  participants: zfd.text(z.string().optional()),
});

export const programDiaryEventFormValidator = withZod(programDiaryEventSchema);

type ProgramFormProps = {
  defaultValues?: Partial<z.infer<typeof programDiaryEventSchema>>;
  participants: Exclude<GetProgramParticipants, null>;
  isAutoEvent?: boolean;
};

export function ProgramDiaryEventForm({
  isAutoEvent = false,
  defaultValues,
  participants,
}: ProgramFormProps) {
  let navigate = useNavigate();
  const [cleanParticipants, setCleanParticipants] = useState(participants);
  const [selectedParticipantsIds, setSelectedParticipantsIds] = useState(
    defaultValues?.participants?.split(',').map(Number) ?? [],
  );

  useEffect(() => {
    setCleanParticipants(
      participants.filter(
        (participant) =>
          !selectedParticipantsIds.includes(participant.participantId),
      ),
    );
  }, [selectedParticipantsIds]);

  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  const eventTypeOptions: { label: string; value: ProgramDiaryType }[] = [
    {
      label: 'Información General',
      value: ParticipantDiaryType.INFO,
    },
  ];

  return (
    <Box px={4} maxWidth="7xl">
      <ValidatedForm
        validator={programDiaryEventFormValidator}
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
            title="Participantes"
            visibility={isAutoEvent ? 'hidden' : undefined}
            position={isAutoEvent ? 'absolute' : undefined}
            left={isAutoEvent ? '-9999em' : undefined}
          >
            <FormStack width="full">
              <FormSelect
                instanceId="participants-select"
                helperText="Acá podés asociar el evento a uno o más participantes del programa"
                name="participants"
                label="Participantes"
                isMulti
                placeholder="Seleccionar participantes..."
                onChange={(newValue) => {
                  if (!newValue) return;

                  if (Array.isArray(newValue)) {
                    setSelectedParticipantsIds(newValue.map((p) => p.value));
                  }
                }}
                options={cleanParticipants?.map((participant) => ({
                  label: `${participant.firstName} ${participant.lastName}`,
                  value: participant.participantId,
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
