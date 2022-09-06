import {
  Box,
  Button,
  Divider,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { ParticipantDiaryType } from '@prisma/client';
import {
  useLocation,
  useMatches,
  useParams,
  useTransition,
} from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm } from 'remix-validated-form';
import { z } from 'zod';

import { FormRichTextEditor } from '~/components/Form/FormRichTextEditor';
import { FormSelect } from '~/components/Form/FormSelect';
import type { GetParticipant } from '~/routes/__index/participants/$id';
import {
  convertStringToNumberForZod,
  getParticipantDiaryTypeProps,
  useSelectedYear,
} from '~/util/utils';

const inactiveModalSchema = z.object({
  type: z.preprocess(
    (value) => (value === '' ? null : value),
    z.nativeEnum(ParticipantDiaryType, {
      errorMap: () => ({
        message: 'El motivo de la baja es obligatorio',
      }),
    }),
  ),
  description: z.string().nullable(),
  year: z.preprocess(
    convertStringToNumberForZod,
    z.number({ required_error: 'El año no puede estar vacío' }).positive(),
  ),
});

export const inactiveModalValidator = withZod(inactiveModalSchema);

type InactiveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  participant: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

export function InactiveModal({ isOpen, onClose }: InactiveModalProps) {
  const { id } = useParams();
  const { pathname, search } = useLocation();
  const selectedYear = useSelectedYear();

  const searchParams = new URLSearchParams(search);
  searchParams.delete('inactiveModal');
  const actionURL = pathname + '?index&' + searchParams.toString();

  const participant = useMatches().find(
    (m) => m.pathname === `/participants/${id}`,
  )?.data as GetParticipant;

  if (!participant) throw new Error("Participant doesn't exist");

  const transition = useTransition();

  const isChangingStatus =
    transition?.submission?.formData.get('formType') === 'changeYearStatus';

  const eventTypeOptions: { label: string; value: ParticipantDiaryType }[] = [
    {
      label: getParticipantDiaryTypeProps(
        ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_3_ABSENT,
      ).description,
      value: ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_3_ABSENT,
    },
    {
      label: getParticipantDiaryTypeProps(
        ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_FAMILY,
      ).description,
      value: ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_FAMILY,
    },
    {
      label: getParticipantDiaryTypeProps(
        ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_LOW_ATTENDANCE,
      ).description,
      value: ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_LOW_ATTENDANCE,
    },
    {
      label: getParticipantDiaryTypeProps(
        ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_NO_SHOW,
      ).description,
      value: ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_NO_SHOW,
    },
    {
      label: getParticipantDiaryTypeProps(
        ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_OTHER,
      ).description,
      value: ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_OTHER,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ValidatedForm
        validator={inactiveModalValidator}
        method="post"
        action={actionURL}
        noValidate
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Dar de baja a {participant.firstName} en el año {selectedYear}
          </ModalHeader>
          <ModalCloseButton tabIndex={4} />
          <ModalBody>
            <Text mb={4} fontWeight={600}>
              ¿Estás seguro de que querés dar de baja a {participant.firstName}{' '}
              {participant.lastName} en el año {selectedYear}?
            </Text>
            <UnorderedList>
              <ListItem>
                Si {participant.firstName} {participant.lastName} está en la
                lista de espera de algún programa del año {selectedYear}, va a
                ser dado/a de baja de la misma.
              </ListItem>
              <ListItem>
                {participant.firstName} {participant.lastName} va a ser dado/a
                de baja de los programas del año {selectedYear} en los que esté
                activo/a.
              </ListItem>
            </UnorderedList>
            <Divider my={4} />
            <FormSelect
              instanceId="event-type"
              name="type"
              label="Motivo de la baja"
              isRequired
              placeholder="Motivo de la baja..."
              options={eventTypeOptions}
            />
            <Box mt={6}>
              <FormRichTextEditor
                name="description"
                placeholder="Descripción del motivo de la baja..."
              />
            </Box>
          </ModalBody>

          <ModalFooter>
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
              <input name="year" type="hidden" value={selectedYear} />
              <input name="formType" type="hidden" value="changeYearStatus" />
              <Button
                type="submit"
                tabIndex={1}
                size="sm"
                colorScheme="red"
                isLoading={isChangingStatus}
              >
                Dar de baja
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ValidatedForm>
    </Modal>
  );
}
