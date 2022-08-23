import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { validationError } from 'remix-validated-form';

import {
  ParticipantForm,
  participantFormValidator,
} from '~/components/Participants/ParticipantsForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

export async function action({ request }: ActionArgs) {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const fieldValues = await participantFormValidator.validate(
    Object.fromEntries(await request.formData()),
  );
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

  const participant = await db.participant.create({
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
      createdBy: user.id,
      updatedBy: user.id,
    },
  });

  return redirect('/participants');
}

export default function NewParticipant() {
  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="8xl">
          <Heading size="lg" mb="0">
            Crear Participante
          </Heading>
        </Container>
      </Box>
      <Box as="main" py="8" flex="1">
        <Container maxW="8xl" id="xxx">
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p="6"
            rounded="lg"
            shadow="base"
          >
            <ParticipantForm />
          </Box>
        </Container>
      </Box>
    </>
  );
}
