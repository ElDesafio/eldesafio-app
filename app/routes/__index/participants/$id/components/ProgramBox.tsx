import { ProgramSex } from '.prisma/client';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { ProgramSexText } from '~/util/utils';
import { AddToProgramModal } from './AddToProgramModal';

type ProgramBoxProps = {
  name: string,
  sex: ProgramSex,
  seatsTaken: number,
  seatsAvailable: number,
  ageFrom: number,
  ageTo: number,
};

export const ProgramBox = ({
  name,
  sex,
  seatsAvailable,
  seatsTaken,
  ageFrom,
  ageTo,
}: ProgramBoxProps) => {
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
          <Button size="xs">Agregar</Button>
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
            {seatsTaken} de {seatsAvailable}
          </Text>
          <br />
          <Text as="span" fontWeight="semibold" fontSize="sm">
            Edad:
          </Text>{' '}
          <Text as="span" fontSize="sm">
            {ageFrom} a {ageTo} años
          </Text>
        </Container>
      </Box>
      <AddToProgramModal
        isOpen={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div />
    </>
  );
};
