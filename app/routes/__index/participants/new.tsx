import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { Prisma } from '@prisma/client';
import type { ActionArgs } from '@remix-run/node';
import { json, redirect, Response } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import type { ValidatorError } from 'remix-validated-form';
import { validationError } from 'remix-validated-form';

import {
  ParticipantForm,
  participantFormValidator,
} from '~/components/Participants/ParticipantsForm';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

// eslint-disable-next-line sonarjs/cognitive-complexity
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

  try {
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
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === 'P2002' &&
        error.meta &&
        Array.isArray(error.meta?.target)
      ) {
        const validatorError: ValidatorError = { fieldErrors: {} };

        error.meta.target.forEach((key) => {
          if (key === 'dni') {
            validatorError.fieldErrors[key] =
              'Ya existe un participante con este DNI';
          }
          if (key === 'email') {
            validatorError.fieldErrors[key] =
              'Ya existe un participante con este correo';
          }
        });

        return validationError(validatorError);
      } else {
        throw new Response('Internal Server Error', { status: 500 });
      }
    }
  }

  throw redirect('/participants');
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
