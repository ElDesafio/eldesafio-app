import type { Participant } from '@prisma/client';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { validationError } from 'remix-validated-form';
import * as z from 'zod';

import {
  ParticipantForm,
  participantFormValidator,
} from '~/components/Participants/ParticipantsForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

async function getParticipant(id: number) {
  return await db.participant.findUnique({
    where: { id },
    include: { school: true },
  });
}

// LOADER
export const loader = async ({ params }: LoaderArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participant = await getParticipant(+id);

  return typedjson({ participant });
};

// ACTION
export const action = async ({ request, params }: ActionArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await participantFormValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const {
    neighborhood,
    phone1BelongsTo,
    phone1HasWhatsapp,
    phone2BelongsTo,
    phone2HasWhatsapp,
    presentedHealthCertificate,
    presentedDNI,
    healthCertificateDate,
  } = fieldValues.data;

  const participant = await db.participant.update({
    where: { id: +id },
    data: {
      ...fieldValues.data,
      neighborhood: neighborhood || undefined,
      phone1HasWhatsapp: !!phone1HasWhatsapp,
      phone1BelongsTo: phone1BelongsTo || undefined,
      phone2HasWhatsapp: !!phone2HasWhatsapp,
      phone2BelongsTo: phone2BelongsTo || undefined,
      presentedHealthCertificate: !!presentedHealthCertificate,
      presentedDNI: !!presentedDNI,
      healthCertificateDate: healthCertificateDate || undefined,
      updatedBy: user.id,
    },
  });

  const url = new URL(request.url);
  const selectedYear = url.searchParams.get('year');

  let returnURL = `/participants/${id}`;

  if (selectedYear) {
    returnURL += `?year=${selectedYear}`;
  }

  return redirect(returnURL);
};

export default function EditParticipant() {
  const { participant } = useTypedLoaderData<typeof loader>();

  let schoolName: string | undefined;

  if (participant?.school) {
    schoolName = participant.school.name;
  }

  let participantClean: Participant;

  if (participant?.school) {
    const { school, ...rest } = participant;
    participantClean = { ...rest };
  } else {
    participantClean = participant as Participant;
  }

  return (
    <>
      <ParticipantForm
        defaultValues={participantClean}
        schoolName={schoolName}
      />
    </>
  );
}
