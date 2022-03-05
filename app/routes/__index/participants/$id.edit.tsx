import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { ActionFunction, LoaderFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import * as z from 'zod';

import {
  ParticipantForm,
  participantFormValidator,
} from '~/components/Participants/ParticipantsForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

import type { Participant, Prisma } from '.prisma/client';

async function getParticipant(id: number) {
  return await db.participant.findUnique({
    where: { id: id },
    include: { school: true },
  });
}

type GetParticipant = Prisma.PromiseReturnType<typeof getParticipant>;

// LOADER
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  return await getParticipant(+id);
};

// ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = participantFormValidator.validate(formData);

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

  return redirect('/participants');
};

export default function EditParticipant() {
  const participant = useLoaderData<GetParticipant>();

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
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="8xl">
          <Heading size="md" mb="0">
            Editar Participante
          </Heading>
        </Container>
      </Box>

      <ParticipantForm
        defaultValues={participantClean}
        schoolName={schoolName}
      />
    </>
  );
}
