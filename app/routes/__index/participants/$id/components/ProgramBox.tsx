import { Container, Divider, HStack, Tag, Text } from '@chakra-ui/react';
import { ParticipantsOnProgramsStatus } from '@prisma/client';
import { useParams, useSearchParams } from '@remix-run/react';

import { CheckboxCard } from '~/components/CheckboxCard';
import { ProgramSexText } from '~/util/utils';

import type { GetParticipantProgramsByYear } from '../programs';
import { AddToProgramModal } from './AddToProgramModal';
import { RemoveFromProgramModal } from './RemoveFromProgramModal';

type ProgramBoxProps = {
  program: GetParticipantProgramsByYear[0];
};

export const ProgramBox = ({ program }: ProgramBoxProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: participantId } = useParams();

  const addToProgramId = searchParams.get('addToProgramId');
  const removeFromProgramId = searchParams.get('removeFromProgramId');

  const { id, name, sex, seats, ageFrom, ageTo, participants } = program;

  const seatsTaken =
    seats -
    participants.filter((p) => p.status === ParticipantsOnProgramsStatus.ACTIVE)
      .length;

  const participantOnProgram = participants.filter(
    (p) => participantId != null && p.participantId === +participantId,
  )[0];

  const isOnWaitingList =
    participantOnProgram?.status === ParticipantsOnProgramsStatus.WAITING;

  const isActive =
    participantOnProgram?.status === ParticipantsOnProgramsStatus.ACTIVE;

  const isInactive =
    participantOnProgram?.status === ParticipantsOnProgramsStatus.INACTIVE;

  return (
    <>
      <CheckboxCard
        key={program.id}
        value={`${program.id}`} // This is not really used, but it's required for CheckboxCard
        onClick={() => {
          if (isActive) {
            searchParams.set('removeFromProgramId', id.toString());
          } else {
            searchParams.set('addToProgramId', id.toString());
          }
          setSearchParams(searchParams, { replace: true });
        }}
        maxWidth="400px"
        checkboxProps={{
          isChecked: isActive,
        }}
      >
        <Container py="0" px="0">
          <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
            {name}
          </Text>
          <Divider mb={2} />
          <Text as="span" fontWeight="semibold" fontSize="sm">
            Sexo:
          </Text>{' '}
          <Text as="span" fontSize="sm">
            {ProgramSexText[sex]}
          </Text>
          <br />
          <Text as="span" fontWeight="semibold" fontSize="sm">
            Cupos disponibles:
          </Text>{' '}
          <Text as="span" fontSize="sm">
            {seatsTaken} de {seats}
          </Text>
          <br />
          <Text as="span" fontWeight="semibold" fontSize="sm">
            Edad:
          </Text>{' '}
          <Text as="span" fontSize="sm">
            {ageFrom} a {ageTo} años
          </Text>
          {(isOnWaitingList || isInactive) && (
            <HStack justifyContent="flex-start" mt={2} spacing={2}>
              {isOnWaitingList && (
                <Tag size="sm" variant="outline" colorScheme="brand">
                  En Espera
                </Tag>
              )}
              {isInactive && participantOnProgram.wasEverActive && (
                <Tag size="sm" variant="solid" colorScheme="red">
                  Baja
                </Tag>
              )}
            </HStack>
          )}
        </Container>
      </CheckboxCard>
      <AddToProgramModal
        isOpen={addToProgramId === id.toString()}
        onClose={() => {
          searchParams.delete('addToProgramId');
          setSearchParams(searchParams, { replace: true });
        }}
        programId={id}
        programName={name}
        isOnWaitingList={isOnWaitingList}
      />
      <RemoveFromProgramModal
        isOpen={removeFromProgramId === id.toString()}
        onClose={() => {
          searchParams.delete('removeFromProgramId');
          setSearchParams(searchParams, { replace: true });
        }}
        programId={id}
        programName={name}
      />
    </>
  );
};
