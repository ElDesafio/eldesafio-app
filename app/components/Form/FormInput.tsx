import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
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
  return (
    <>
      {hidden ? (
        <VisuallyHiddenInput
          id={name}
          name={name}
          onBlur={validate}
          onChange={clearError}
          defaultValue={defaultValue}
          type={rest?.type}
        />
      ) : (
        <FormControl isInvalid={!!error} isRequired={isRequired}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
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
      )}
    </>
  );
};
