import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  VisuallyHidden,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useField } from "remix-validated-form";

type FormInputProps = {
  name: string;
  label: string;
  isRequired?: boolean;
  hidden?: boolean;
  helperText?: React.ReactNode;
};

export const FormInput = ({
  name,
  label,
  isRequired,
  hidden = false,
  helperText,
  ...rest
}: FormInputProps & InputProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);

  const input = (
    <Input
      id={name}
      name={name}
      onBlur={validate}
      onChange={clearError}
      defaultValue={defaultValue}
      {...rest}
    />
  );
  return (
    <>
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {!hidden && <FormLabel htmlFor={name}>{label}</FormLabel>}
        {hidden ? <VisuallyHidden>{input}</VisuallyHidden> : input}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </>
  );
};
