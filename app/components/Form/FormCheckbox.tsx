import type { CheckboxProps } from '@chakra-ui/react';
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type FormCheckboxProps = {
  name: string;
  label?: string;
  isRequired?: boolean;
  helperText?: React.ReactNode;
};

export const FormCheckbox = ({
  name,
  label,
  isRequired,
  helperText,
  ...rest
}: FormCheckboxProps & CheckboxProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Checkbox
        id={name}
        name={name}
        onBlur={validate}
        onChange={clearError}
        defaultValue={defaultValue}
        defaultChecked={defaultValue}
        {...rest}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
