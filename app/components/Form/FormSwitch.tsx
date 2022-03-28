import type { SwitchProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type FormSwitchProps = {
  name: string;
  label?: string;
  isRequired?: boolean;
  helperText?: React.ReactNode;
};

export const FormSwitch = ({
  name,
  label,
  isRequired,
  helperText,
  ...rest
}: FormSwitchProps & SwitchProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Switch
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
