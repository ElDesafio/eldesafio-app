import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export const FormSubmitButton = (props: ButtonProps) => {
  return (
    <Button type="submit" colorScheme="blue" {...props}>
      Enviar
    </Button>
  );
};
