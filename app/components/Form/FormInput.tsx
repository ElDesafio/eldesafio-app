import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputElementProps,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
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
  leftElement?: InputElementProps;
  rightElement?: InputElementProps;
};

export const FormInput = ({
  name,
  label,
  isRequired,
  hidden = false,
  helperText,
  leftElement,
  rightElement,
  maxWidth,
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
      <FormControl
        isInvalid={!!error}
        isRequired={isRequired}
        maxWidth={maxWidth}
      >
        {!hidden && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <InputGroup>
          {leftElement && <InputLeftElement {...leftElement} />}
          {hidden ? <VisuallyHidden>{input}</VisuallyHidden> : input}
          {rightElement && <InputRightElement {...rightElement} />}
        </InputGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </>
  );
};
