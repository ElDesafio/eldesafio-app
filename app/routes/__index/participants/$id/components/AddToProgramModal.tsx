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
import { Form, useMatches, useParams } from 'remix';

import { GetParticipant } from '../../$id';
import { FormTypeAddToProgram } from '../programs';

type AddToProgramModalProps = {
  isOpen: boolean;
  onClose: () => void;
  programId: number;
  programName: string;
};

export function AddToProgramModal({
  isOpen,
  onClose,
  programName,
  programId,
}: AddToProgramModalProps) {
  const { id } = useParams();

  const participant = useMatches().find(
    (m) => m.pathname === `/participants/${id}`,
  )?.data as GetParticipant;

  if (!participant) throw new Error("Participant doesn't exist");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar a {programName}</ModalHeader>
        <ModalCloseButton tabIndex={4} />
        <ModalBody>
          Seguro que querés agregar a {participant.firstName} a {programName}?
        </ModalBody>

        <ModalFooter>
          <Flex direction="row" justifyContent="space-between" width="100%">
            <Form method="post" reloadDocument>
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
                colorScheme="teal"
                variant="outline"
                mr={3}
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
              <Form method="post" reloadDocument>
                <input
                  name="type"
                  type="hidden"
                  value={FormTypeAddToProgram.ACTIVE}
                />
                <input name="programId" type="hidden" value={programId} />
                <Button type="submit" tabIndex={1} size="sm" colorScheme="blue">
                  Agregar
                </Button>
              </Form>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
