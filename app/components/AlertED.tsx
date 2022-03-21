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
  small?: boolean;
};

export function AlertED({
  title,
  description,
  small = false,
  ...rest
}: AlertEDProps & AlertProps) {
  return (
    <Alert
      status="info"
      variant={small ? undefined : 'subtle'}
      flexDirection={small ? undefined : 'column'}
      alignItems={small ? undefined : 'center'}
      justifyContent={small ? undefined : 'center'}
      textAlign={small ? undefined : 'center'}
      height={small ? undefined : '170px'}
      rounded="lg"
      colorScheme={
        rest.status === undefined || rest.status === 'info' ? 'gray' : undefined
      }
      {...rest}
    >
      <AlertIcon
        boxSize={small ? undefined : '40px'}
        mr={small ? undefined : 0}
      />
      {title && (
        <AlertTitle mt={4} fontSize="md">
          {title}
        </AlertTitle>
      )}
      {description && (
        <AlertDescription mt={1} maxWidth="max">
          {description}
        </AlertDescription>
      )}
    </Alert>
  );
}
