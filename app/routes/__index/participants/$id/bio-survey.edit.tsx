import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';

import {
  ParticipantBioSurveyForm,
  participantBioSurveyValidator,
} from '~/components/Participants/ParticipantBioSurveyForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import type { GetParticipantBioSurvey } from '~/services/participants.service';
import { getParticipantBioSurvey } from '~/services/participants.service';

// LOADER
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  return await getParticipantBioSurvey(+id);
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
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
  const participantBioSurvey = useLoaderData<GetParticipantBioSurvey>();

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
