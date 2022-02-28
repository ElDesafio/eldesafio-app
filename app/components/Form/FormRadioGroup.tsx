import type { RadioGroupProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { FormAnswerOptions } from '@prisma/client';
import { useField } from 'remix-validated-form';

type FormRadioGroupProps = {
  name: string;
  label?: string;
  isRequired?: boolean;
  redAnswer?: 'yes' | 'no' | 'dkna';
  helperText?: React.ReactNode;
};

export const FormRadioGroup = ({
  name,
  label,
  isRequired,
  helperText,
  redAnswer,
  onChange,
  ...rest
}: FormRadioGroupProps & Omit<RadioGroupProps, 'children'>) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <RadioGroup
        id={name}
        name={name}
        onBlur={validate}
        onChange={(value) => {
          if (onChange) {
            onChange(value);
          }
          clearError();
        }}
        defaultValue={defaultValue}
        {...rest}
      >
        <Stack direction="row">
          <Radio
            colorScheme={redAnswer === 'yes' ? 'red' : undefined}
            value={FormAnswerOptions.YES}
          >
            Sí
          </Radio>
          <Radio
            colorScheme={redAnswer === 'no' ? 'red' : undefined}
            value={FormAnswerOptions.NO}
          >
            No
          </Radio>
          <Radio
            colorScheme={redAnswer === 'dkna' ? 'red' : undefined}
            value={FormAnswerOptions.DKNA}
          >
            Ns/Nc
          </Radio>
        </Stack>
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
