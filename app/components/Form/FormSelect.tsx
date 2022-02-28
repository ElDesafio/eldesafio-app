import type { SelectProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type FormSelectProps = {
  name: string;
  label: string;
  isRequired?: boolean;
  helperText?: React.ReactNode;
};

export const FormSelect = ({
  name,
  label,
  isRequired,
  helperText,
  ...rest
}: FormSelectProps & SelectProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        id={name}
        name={name}
        onBlur={validate}
        onChange={clearError}
        defaultValue={defaultValue}
        {...rest}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
