import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';

import {
  ParticipantHealthForm,
  participantHealthValidator,
} from '~/components/Participants/ParticipantHealthForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import { getParticipantHealth } from '~/services/participants.service';
import { getLoggedInUser } from '~/services/users.service';

// LOADER
export async function loader({ request, params }: LoaderArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const participantHealth = await getParticipantHealth(+id);

  return json({ participantHealth });
}

// ACTION
export async function action({ request, params }: ActionArgs) {
  await getLoggedInUser(request);

  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await participantHealthValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  await db.participantHealth.upsert({
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
}

export default function ParticipantHealthEdit() {
  const { participantHealth } = useLoaderData<typeof loader>();

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
