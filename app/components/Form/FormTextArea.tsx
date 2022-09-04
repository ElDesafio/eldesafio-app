import type { TextareaProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type FormTextAreaProps = {
  name: string;
  label?: string;
  hideLabel?: boolean;
  isRequired?: boolean;
  helperText?: React.ReactNode;
};

export const FormTextArea = ({
  name,
  label,
  hideLabel,
  isRequired,
  helperText,
  ...rest
}: FormTextAreaProps & TextareaProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel
        htmlFor={name}
        style={hideLabel ? { display: 'none' } : undefined}
      >
        {label}
      </FormLabel>
      <Textarea
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
