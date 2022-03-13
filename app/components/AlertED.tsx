import type { AlertProps } from '@chakra-ui/react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

type AlertEDProps = {
  title?: string;
  description?: string;
};

export function AlertED({
  title,
  description,
  ...rest
}: AlertEDProps & AlertProps) {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="170px"
      rounded="lg"
      colorScheme="gray"
      {...rest}
    >
      <AlertIcon boxSize="40px" mr={0} />
      {title && (
        <AlertTitle mt={4} fontSize="md">
          {title}
        </AlertTitle>
      )}
      {description && (
        <AlertDescription mt={1} maxWidth="sm">
          {description}
        </AlertDescription>
      )}
    </Alert>
  );
}
