import type { Prisma } from '@prisma/client';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';

import {
  ParticipantHealthForm,
  participantHealthValidator,
} from '~/components/Participants/ParticipantHealthForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import type { GetParticipantHealth } from '~/services/participants.service';
import { getParticipantHealth } from '~/services/participants.service';

// LOADER
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  return await getParticipantHealth(+id);
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await participantHealthValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const participant = await db.participantHealth.upsert({
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

  return redirect(`/participants/${id}/health`);
};

export default function ParticipantHealthEdit() {
  const participantHealth = useLoaderData<GetParticipantHealth>();

  return (
    <div>
      <ParticipantHealthForm
        defaultValues={
          participantHealth != null ? participantHealth : undefined
        }
      />
    </div>
  );
}
