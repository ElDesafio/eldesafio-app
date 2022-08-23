import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';

import {
  ParticipantBioSurveyForm,
  participantBioSurveyValidator,
} from '~/components/Participants/ParticipantBioSurveyForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import { getParticipantBioSurvey } from '~/services/participants.service';

// LOADER
export const loader = async ({ params }: LoaderArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participantBioSurvey = await getParticipantBioSurvey(+id);

  return json({ participantBioSurvey });
};

// ACTION
export const action = async ({ request, params }: ActionArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await participantBioSurveyValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const participant = await db.surveyBiography.upsert({
    where: { participantId: +id },
    create: {
      ...fieldValues.data,
      participantId: +id,
      createdBy: user.id,
      updatedBy: user.id,
    },
    update: {
      ...fieldValues.data,
      updatedBy: user.id,
    },
  });

  return redirect(`/participants/${id}/bio-survey`);
};

export default function ParticipantBioSurveyEdit() {
  const { participantBioSurvey } = useLoaderData<typeof loader>();

  return (
    <div>
      <ParticipantBioSurveyForm
        defaultValues={
          participantBioSurvey != null ? participantBioSurvey : undefined
        }
      />
    </div>
  );
}
