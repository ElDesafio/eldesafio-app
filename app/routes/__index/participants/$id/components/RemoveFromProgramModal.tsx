import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Form, useLocation, useMatches, useParams, useTransition } from 'remix';

import type { GetParticipant } from '../../$id';
import { FormTypeAddToProgram } from '../programs';

type RemoveFromProgramModalProps = {
  isOpen: boolean;
  onClose: () => void;
  programId: number;
  programName: string;
};

export function RemoveFromProgramModal({
  isOpen,
  onClose,
  programName,
  programId,
}: RemoveFromProgramModalProps) {
  const { id } = useParams();
  const location = useLocation();

  const participant = useMatches().find(
    (m) => m.pathname === `/participants/${id}`,
  )?.data as GetParticipant;

  if (!participant) throw new Error("Participant doesn't exist");

  const transition = useTransition();

  const isRemoving =
    transition?.submission?.formData.get('type') ===
    FormTypeAddToProgram.REMOVE;

  const isAddingToWaitingList =
    transition?.submission?.formData.get('type') ===
    FormTypeAddToProgram.WAITING;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dar de baja de {programName}</ModalHeader>
        <ModalCloseButton tabIndex={4} />
        <ModalBody>
          Seguro que querés dar de baja a {participant.firstName} de &quot;
          {programName}&quot;?
        </ModalBody>

        <ModalFooter>
          <Flex direction="row" justifyContent="space-between" width="100%">
            <Form method="post">
              <input
                name="type"
                type="hidden"
                value={FormTypeAddToProgram.WAITING}
              />
              <input name="programId" type="hidden" value={programId} />
              <Button
                type="submit"
                tabIndex={2}
                size="sm"
                colorScheme="brand"
                variant="outline"
                mr={3}
                isLoading={isAddingToWaitingList}
              >
                Agregar en Espera
              </Button>
            </Form>
            <Flex>
              <Button
                tabIndex={3}
                size="sm"
                colorScheme="gray"
                mr={3}
                onClick={onClose}
              >
                Cerrar
              </Button>
              <Form method="post">
                <input
                  name="type"
                  type="hidden"
                  value={FormTypeAddToProgram.REMOVE}
                />
                <input name="programId" type="hidden" value={programId} />
                <Button
                  type="submit"
                  tabIndex={1}
                  size="sm"
                  colorScheme="red"
                  isLoading={isRemoving}
                >
                  Dar de baja
                </Button>
              </Form>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
