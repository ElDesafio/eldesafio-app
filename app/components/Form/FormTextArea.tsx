import {
  Textarea,
  TextareaProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "remix-validated-form";

type FormTextAreaProps = {
  name: string;
  label?: string;
  isRequired?: boolean;
  helperText?: React.ReactNode;
};

export const FormTextArea = ({
  name,
  label,
  isRequired,
  helperText,
  ...rest
}: FormTextAreaProps & TextareaProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
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
