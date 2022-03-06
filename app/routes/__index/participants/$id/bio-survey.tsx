import {
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FormAnswerOptions } from '@prisma/client';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
import { z } from 'zod';

import type { GetParticipantBioSurvey } from '~/services/participants.service';
import { getParticipantBioSurvey } from '~/services/participants.service';
import { getFormAnswerOptionName } from '~/util/utils';

// LOADER
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  return await getParticipantBioSurvey(+id);
};

export default function ParticipantHealth() {
  const participantBioSurvey = useLoaderData<GetParticipantBioSurvey>();

  return (
    <div>
      {participantBioSurvey ? (
        <>
          <Heading as="h3" size="md">
            Familia
          </Heading>
          <Divider mb={3} />
          <Stack direction={{ base: 'column', lg: 'row' }} spacing="2">
            <Stack direction="row" width="full">
              <Text>¿Quiénes viven en la casa?</Text>
              <Text fontWeight="semibold">
                {participantBioSurvey.livesWith}
              </Text>
            </Stack>
          </Stack>
          <Heading as="h3" size="md" mt={6}>
            Escuela
          </Heading>
          <Divider mb={3} />
          <VStack spacing={2} width="full">
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              width="full"
              spacing="2"
            >
              <Stack direction="row" width="full">
                <Text>¿Se cambió alguna vez de escuela?</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantBioSurvey.changedSchool,
                    participantBioSurvey.changedSchool === 'YES',
                  )}
                </Text>
              </Stack>
              <Stack direction="row" width="full">
                <Text>¿Repitió alguna vez?</Text>
                <Text fontWeight="semibold">
                  {getFormAnswerOptionName(
                    participantBioSurvey.repeatedYear,
                    participantBioSurvey.repeatedYear === 'YES',
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
                {participantBioSurvey.changedSchool ===
                  FormAnswerOptions.YES && (
                  <>
                    <Text>Motivo:</Text>
                    <Text fontWeight="semibold">
                      {participantBioSurvey.reasonChangedSchool}
                    </Text>
                  </>
                )}
              </Stack>
              <Stack direction="row" width="full">
                {participantBioSurvey.repeatedYear ===
                  FormAnswerOptions.YES && (
                  <>
                    <Text>Motivo:</Text>
                    <Text fontWeight="semibold">
                      {participantBioSurvey.reasonRepeatedYear}
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
                <Text>¿Cómo es la situación en la escuela?</Text>
                <Text fontWeight="semibold">
                  {participantBioSurvey.schoolSituation}
                </Text>
              </Stack>
            </Stack>
          </VStack>
          <Heading as="h3" size="md" mt={6}>
            El Desafío
          </Heading>
          <Divider mb={3} />
          <VStack spacing={2} width="full">
            <Stack direction="row" width="full">
              <Text>¿Por qué le interesa que participe en los programas?</Text>
              <Text fontWeight="semibold">
                {participantBioSurvey.programsInterest}
              </Text>
            </Stack>
            <Stack direction="row" width="full">
              <Text>¿Participó en años anteriores?</Text>
              <Text fontWeight="semibold">
                {getFormAnswerOptionName(
                  participantBioSurvey.participatedBefore,
                )}
              </Text>
            </Stack>
            {participantBioSurvey.participatedBefore ===
              FormAnswerOptions.YES && (
              <Stack direction="row" width="full">
                <Text>¿Desde qué año y en qué programas?</Text>
                <Text fontWeight="semibold">
                  {participantBioSurvey.participatedBeforeDescription}
                </Text>
              </Stack>
            )}
            {participantBioSurvey.participatedBefore ===
              FormAnswerOptions.YES &&
              participantBioSurvey.finishedYear && (
                <Stack direction="row" width="full">
                  <Text>¿Terminó el año?</Text>
                  <Text fontWeight="semibold">
                    {getFormAnswerOptionName(participantBioSurvey.finishedYear)}
                  </Text>
                </Stack>
              )}
          </VStack>
          <Heading as="h3" size="md" mt={6}>
            Sobre el participante
          </Heading>
          <Divider mb={3} />
          <VStack spacing={2} width="full">
            <Stack direction="row" width="full">
              <Text>¿Realiza alguna actividad además de El Desafío?</Text>
              <Text fontWeight="semibold">
                {getFormAnswerOptionName(
                  participantBioSurvey.otherActivities,
                  participantBioSurvey.otherActivities === 'NO',
                )}
              </Text>
            </Stack>
            {participantBioSurvey.otherActivities === FormAnswerOptions.YES && (
              <Stack direction="row" width="full">
                <Text>Actividades extra:</Text>
                <Text fontWeight="semibold">
                  {participantBioSurvey.otherActivitiesDescription}
                </Text>
              </Stack>
            )}
            <Stack direction="row" width="full">
              <Text>¿Como lo/la describiría?</Text>
              <Text fontWeight="semibold">
                {participantBioSurvey.personalDescription}
              </Text>
            </Stack>
            <Stack direction="row" width="full">
              <Text>
                ¿Qué hace en su casa? ¿Con qué y con quién juega? ¿Como es un
                día típico?
              </Text>
              <Text fontWeight="semibold">
                {participantBioSurvey.homeActivities}
              </Text>
            </Stack>
          </VStack>
        </>
      ) : (
        <p>No hay datos biográficos</p>
      )}
      <Stack direction="row" mt={6} justifyContent="center" width="full">
        <Link to={`edit`}>
          <Button colorScheme="blue">Editar</Button>
        </Link>
      </Stack>
    </div>
  );
}
