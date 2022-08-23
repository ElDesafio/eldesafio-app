import {
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { getParticipantHealth } from '~/services/participants.service';
import { getBloodTypeName, getFormAnswerOptionName } from '~/util/utils';

// LOADER
export async function loader({ params }: LoaderArgs) {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participantHealth = await getParticipantHealth(+id);

  return json({ participantHealth });
}

export default function ParticipantHealth() {
  const { participantHealth } = useLoaderData<typeof loader>();

  return (
    <div>
      {participantHealth ? (
        <>
          <Heading as="h3" size="md">
            Antecedentes fisiológicos
          </Heading>
          <Divider mb={3} />
          <Stack direction={{ base: 'column', lg: 'row' }} spacing="2">
            <Stack direction="row" width="full">
              <Text>Grupo sanguíneo y RH:</Text>
              <Text fontWeight="semibold">
                {getBloodTypeName(participantHealth.bloodType)}
              </Text>
            </Stack>
            <Stack direction="row" width="full">
              <Text>Embarazo normal:</Text>
              <Text fontWeight="semibold">
                {getFormAnswerOptionName(
                  participantHealth.isNormalPregnancy,
                  participantHealth.isNormalPregnancy === 'NO',
                )}
              </Text>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            width="full"
            mt={{ base: 2, lg: 2 }}
            alignItems="flex-end"
          >
            <Text>¿Tiene todas las vacunas que corresponden por su edad?</Text>
            <Text fontWeight="semibold">
              {getFormAnswerOptionName(
                participantHealth.hasCompleteVaccination,
                participantHealth.hasCompleteVaccination === 'NO',
              )}
            </Text>
          </Stack>
          <Heading as="h3" size="md" mt={6}>
            Enfermedades padecidas
          </Heading>
          <Divider mb={3} />
          <Heading
            as="h5"
            size="sm"
            mt={6}
            mb={3}
            textDecoration="underline"
            textDecorationColor="gray.200"
          >
            Enfermedades del corazón
          </Heading>
          <VStack spacing={2} width="full">
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              width="full"
              spacing="2"
            >
              <Stack direction="row" width="full">
                <Text>Cardiopatías congénitas:</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.hasCongenitalHeartDisease,
                    participantHealth.hasCongenitalHeartDisease === 'YES',
                  )}
                </Text>
              </Stack>
              <Stack direction="row" width="full">
                <Text>Soplos:</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.hasHeartMurmurs,
                    participantHealth.hasHeartMurmurs === 'YES',
                  )}
                </Text>
              </Stack>
            </Stack>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              width="full"
              spacing="2"
            >
              <Stack direction="row" width="full">
                <Text>Hipertensión arterial:</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.hasHypertension,
                    participantHealth.hasHypertension === 'YES',
                  )}
                </Text>
              </Stack>
              <Stack direction="row" width="full">
                <Text>Arritmias:</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.hasArrhythmia,
                    participantHealth.hasArrhythmia === 'YES',
                  )}
                </Text>
              </Stack>
            </Stack>
          </VStack>
          <Heading
            as="h5"
            size="sm"
            mt={6}
            mb={3}
            textDecoration="underline"
            textDecorationColor="gray.200"
          >
            Alergias
          </Heading>
          <VStack spacing={2} width="full">
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              width="full"
              spacing="2"
            >
              <Stack direction="row" width="full">
                <Text>¿Sufre de algún tipo de alergia?:</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.hasAllergy,
                    participantHealth.hasAllergy === 'YES',
                  )}
                </Text>
              </Stack>
              <Stack direction="row" width="full">
                {participantHealth.hasAllergy === 'YES' && (
                  <>
                    <Text>Detalle:</Text>
                    <Text fontWeight="semibold">
                      {participantHealth.allergyDetails}
                    </Text>
                  </>
                )}
              </Stack>
            </Stack>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              width="full"
              spacing="2"
            >
              <Stack direction="row" width="full">
                <Text>¿Alguna Restricción alimentaria?</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.hasFoodRestriction,
                    participantHealth.hasFoodRestriction === 'YES',
                  )}
                </Text>
              </Stack>
              <Stack direction="row" width="full">
                {participantHealth.hasFoodRestriction === 'YES' && (
                  <>
                    <Text>Detalle:</Text>
                    <Text fontWeight="semibold">
                      {participantHealth.foodRestrictionDetails}
                    </Text>
                  </>
                )}
              </Stack>
            </Stack>
          </VStack>
          <Heading as="h3" size="md" mt={6}>
            Otras
          </Heading>
          <Divider mb={3} />
          <VStack spacing={2} width="full">
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              width="full"
              spacing="2"
            >
              <Stack direction="row" width="full">
                <Text>¿Sufre alguna enfermedad crónica?</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.hasChronicDisease,
                    participantHealth.hasChronicDisease === 'YES',
                  )}
                </Text>
              </Stack>
              <Stack direction="row" width="full">
                {participantHealth.hasChronicDisease === 'YES' && (
                  <>
                    <Text>Detalle:</Text>
                    <Text fontWeight="semibold">
                      {participantHealth.chronicDiseaseDetails}
                    </Text>
                  </>
                )}
              </Stack>
            </Stack>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              width="full"
              spacing="2"
            >
              <Stack direction="row" width="full">
                <Text>Está tomando medicamentos?</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.isTakingMedication,
                    participantHealth.isTakingMedication === 'YES',
                  )}
                </Text>
              </Stack>
              <Stack direction="row" width="full">
                {participantHealth.isTakingMedication === 'YES' && (
                  <>
                    <Text>Detalle:</Text>
                    <Text fontWeight="semibold">
                      {participantHealth.takingMedicationDetails}
                    </Text>
                  </>
                )}
              </Stack>
            </Stack>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              width="full"
              spacing="2"
            >
              <Stack direction="row" width="full">
                <Text>¿Ha estado internado?</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantHealth.hasBeenHospitalized,
                    participantHealth.hasBeenHospitalized === 'YES',
                  )}
                </Text>
              </Stack>
              <Stack direction="row" width="full">
                {participantHealth.hasBeenHospitalized === 'YES' && (
                  <>
                    <Text>Detalle:</Text>
                    <Text fontWeight="semibold">
                      {participantHealth.hospitalizedDetails}
                    </Text>
                  </>
                )}
              </Stack>
            </Stack>
            <Stack direction="row" width="full">
              <Text>¿Puede realizar actividad física?</Text>
              <Text fontWeight="semibold">
                {getFormAnswerOptionName(
                  participantHealth.canDoPhysicalActivity,
                  participantHealth.canDoPhysicalActivity === 'NO',
                )}
              </Text>
            </Stack>
          </VStack>
          <Heading as="h3" size="md" mt={6}>
            Observaciones
          </Heading>
          <Divider mb={3} />
          <Stack direction="row" width="full">
            <Text>{participantHealth.observations}</Text>
          </Stack>
        </>
      ) : (
        <AlertED title="Vacío" description="No hay datos de salud" />
      )}
      <Stack direction="row" mt={6} justifyContent="center" width="full">
        <LinkED to="edit">
          <Button colorScheme="blue">Editar</Button>
        </LinkED>
      </Stack>
    </div>
  );
}
