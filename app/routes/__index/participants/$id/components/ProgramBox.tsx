import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Tag,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { ParticipantsOnProgramsStatus } from '@prisma/client';
import { useParams, useSearchParams } from 'remix';

import { ProgramSexText } from '~/util/utils';

import { GetParticipantProgramsByYear } from '../programs';
import { AddToProgramModal } from './AddToProgramModal';

type ProgramBoxProps = {
  program: GetParticipantProgramsByYear[0];
};

export const ProgramBox = ({ program }: ProgramBoxProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: participantId } = useParams();

  const modalProgramId = searchParams.get('modalProgramId');

  const { id, name, sex, seats, ageFrom, ageTo, participants } = program;

  const seatsTaken =
    seats -
    participants.filter((p) => p.status === ParticipantsOnProgramsStatus.ACTIVE)
      .length;

  const isOnWaitingList =
    participants.filter(
      (p) =>
        p.status === ParticipantsOnProgramsStatus.WAITING &&
        participantId != null &&
        p.participantId === +participantId,
    ).length === 1;

  const isActive =
    participants.filter(
      (p) =>
        p.status === ParticipantsOnProgramsStatus.ACTIVE &&
        participantId != null &&
        p.participantId === +participantId,
    ).length === 1;

  const isInactive =
    participants.filter(
      (p) =>
        p.status === ParticipantsOnProgramsStatus.INACTIVE &&
        participantId != null &&
        p.participantId === +participantId,
    ).length === 1;

  return (
    <>
      <Box
        rounded={{ lg: 'lg' }}
        bg={mode('white', 'gray.700')}
        shadow="base"
        overflow="hidden"
      >
        <Flex align="center" justify="space-between" px="4" py="2">
          <Text as="h5" fontWeight="bold" fontSize="md" isTruncated>
            {name}
          </Text>
          <Button
            size="xs"
            onClick={() => {
              setSearchParams(
                { modalProgramId: id.toString() },
                { replace: false },
              );
            }}
          >
            Agregar
          </Button>
        </Flex>
        <Divider />
        <Container spacing="6" py="2" px="4">
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
          {(isOnWaitingList || isActive || isInactive) && (
            <HStack justifyContent="flex-end" mt={2} spacing={2}>
              {isOnWaitingList && (
                <Tag size="sm" variant="outline" colorScheme="teal">
                  En Espera
                </Tag>
              )}
              {isActive && (
                <Tag size="sm" variant="solid" colorScheme="green">
                  Activo
                </Tag>
              )}
              {isInactive && (
                <Tag size="sm" variant="solid" colorScheme="red">
                  Inactivo
                </Tag>
              )}
            </HStack>
          )}
        </Container>
      </Box>
      <AddToProgramModal
        isOpen={modalProgramId === id.toString()}
        onClose={() => setSearchParams({}, { replace: false })}
        programId={id}
        programName={name}
      />
    </>
  );
};
