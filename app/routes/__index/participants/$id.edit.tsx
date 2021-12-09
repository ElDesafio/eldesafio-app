import { Box, Container, Heading, useColorModeValue } from "@chakra-ui/react";
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "remix";
import { validationError } from "remix-validated-form";
import { db } from "~/services/db.server";
import { authenticator } from "~/services/auth.server";
import {
  ParticipantForm,
  participantFormValidator,
} from "~/components/Participants/ParticipantsForm";
import * as z from "zod";

import { Participant } from ".prisma/client";

// LOADER
export let loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participant: Participant | null = await db.participant.findUnique({
    where: { id: +id },
  });
  return participant;
};

//ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const fieldValues = participantFormValidator.validate(
    Object.fromEntries(await request.formData())
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

  return redirect("/participants");
};

export default function EditParticipant() {
  const participant = useLoaderData<Participant>();
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="7xl">
          <Heading size="lg" mb="0">
            Editar Participante
          </Heading>
        </Container>
      </Box>

      <ParticipantForm defaultValues={participant} />
    </>
  );
}
