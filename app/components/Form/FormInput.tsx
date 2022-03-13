import type { InputElementProps, InputProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useField } from 'remix-validated-form';

type FormInputProps = {
  name: string;
  label?: string;
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
  const [value, setValue] = useState(
    defaultValue == null ? undefined : defaultValue,
  );

  const input = (
    <Input
      id={name}
      name={name}
      onBlur={validate}
      onChange={(event) => {
        clearError();
        setValue(event.target.value);
      }}
      value={value}
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
        {!hidden && label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <InputGroup>
          {leftElement && <InputLeftElement> {leftElement}</InputLeftElement>}
          {hidden ? <VisuallyHidden>{input}</VisuallyHidden> : input}
          {rightElement && (
            <InputRightElement>{rightElement}</InputRightElement>
          )}
        </InputGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </>
  );
};
